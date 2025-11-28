import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DesignSystemPage() {
    return (
        <div className="container mx-auto py-10 space-y-10">
            <div className="space-y-4">
                <h1 className="text-4xl font-serif font-bold text-foreground">Design System Verification</h1>
                <p className="text-muted-foreground">Verifying fonts, colors, and components.</p>
            </div>

            <Separator />

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold">Typography</h2>
                <div className="space-y-2">
                    <h1 className="text-4xl font-serif">Heading 1 (Playfair Display)</h1>
                    <h2 className="text-3xl font-serif">Heading 2 (Playfair Display)</h2>
                    <h3 className="text-2xl font-serif">Heading 3 (Playfair Display)</h3>
                    <p className="text-base font-sans">Body text (Inter). The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-sm text-muted-foreground font-sans">Muted text (Inter).</p>
                </div>
            </section>

            <Separator />

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-background border rounded-md">Background</div>
                    <div className="p-4 bg-secondary text-secondary-foreground rounded-md">Secondary</div>
                    <div className="p-4 bg-primary text-primary-foreground rounded-md">Primary (Accent)</div>
                    <div className="p-4 bg-muted text-muted-foreground rounded-md">Muted</div>
                    <div className="p-4 bg-card text-card-foreground border rounded-md">Card</div>
                    <div className="p-4 bg-popover text-popover-foreground border rounded-md">Popover</div>
                    <div className="p-4 bg-destructive text-destructive-foreground rounded-md">Destructive</div>
                </div>
            </section>

            <Separator />

            <section className="space-y-4">
                <h2 className="text-2xl font-serif font-semibold">Components</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-serif">Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content. This is a card using the defined styles.</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Submit</Button>
                        </CardFooter>
                    </Card>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Buttons</h3>
                            <div className="flex flex-wrap gap-2">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="link">Link</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Inputs</h3>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input type="email" placeholder="Email" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input type="text" placeholder="Disabled" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
