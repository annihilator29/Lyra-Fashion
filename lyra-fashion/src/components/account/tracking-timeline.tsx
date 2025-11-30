import { CheckCircle, Package, Scissors, Truck, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@/types/database.types';

interface TrackingTimelineProps {
    status: OrderStatus;
    className?: string;
}

type TimelineStep = 'placed' | 'production' | 'quality_check' | 'shipped' | 'delivered';

const STEPS: { id: TimelineStep; label: string; icon: React.ElementType; description?: string }[] = [
    { id: 'placed', label: 'Placed', icon: Package },
    { id: 'production', label: 'Production', icon: Scissors, description: 'Your garment is being sewn' },
    { id: 'quality_check', label: 'Quality Check', icon: CheckCircle },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Home },
];

export function TrackingTimeline({ status, className }: TrackingTimelineProps) {
    // Map DB status to timeline step
    const getTimelineStep = (status: OrderStatus): TimelineStep => {
        switch (status) {
            case 'pending':
            case 'paid':
                return 'placed';
            case 'production':
                return 'production';
            case 'quality_check':
                return 'quality_check';
            case 'shipped':
                return 'shipped';
            case 'delivered':
                return 'delivered';
            case 'cancelled':
                return 'placed'; // Default to start
            default:
                return 'placed';
        }
    };

    const currentStepId = getTimelineStep(status);
    const currentStepIndex = STEPS.findIndex((step) => step.id === currentStepId);

    return (
        <div className={cn('w-full py-8', className)}>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                {/* Progress Bar Background - Desktop */}
                <div className="hidden md:block absolute left-0 top-6 h-0.5 w-full bg-gray-200 -z-10" />

                {/* Progress Bar Active - Desktop */}
                <div
                    className="hidden md:block absolute left-0 top-6 h-0.5 bg-primary transition-all duration-500 -z-10"
                    style={{
                        width: `calc(${currentStepIndex / (STEPS.length - 1)} * 100%)`
                    }}
                />

                {/* Progress Bar Background - Mobile */}
                <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 -z-10" />

                {/* Progress Bar Active - Mobile */}
                <div
                    className="md:hidden absolute left-6 top-0 w-0.5 bg-primary transition-all duration-500 -z-10"
                    style={{
                        height: `calc(${currentStepIndex / (STEPS.length - 1)} * 100%)`
                    }}
                />

                {STEPS.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-row md:flex-col items-center gap-4 md:gap-2 mb-8 md:mb-0 w-full md:w-auto relative">
                            <div
                                className={cn(
                                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 bg-white z-10',
                                    isCompleted
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-gray-300 text-gray-400',
                                    isCurrent && 'ring-4 ring-primary/20'
                                )}
                            >
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col md:items-center">
                                <span
                                    className={cn(
                                        'text-sm font-medium transition-colors duration-300',
                                        isCompleted ? 'text-primary' : 'text-gray-500',
                                        isCurrent && 'font-bold'
                                    )}
                                >
                                    {step.label}
                                </span>
                                {step.description && isCurrent && (
                                    <span className="text-xs text-gray-500 mt-1 animate-in fade-in slide-in-from-top-1">
                                        {step.description}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
