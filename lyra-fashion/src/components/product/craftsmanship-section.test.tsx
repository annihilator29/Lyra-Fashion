import { render, screen } from '@testing-library/react';
import { CraftsmanshipSection } from './craftsmanship-section';
import { CraftsmanshipContent } from '@/types/database.types';

describe('CraftsmanshipSection', () => {
    const mockCraftsmanshipData: CraftsmanshipContent = {
        origin_story: 'Hand-stitched in a small atelier in Milan, Italy.',
        material_details: '100% Organic Peace Silk sourced from ethical farms.',
        artisan_note: 'Each piece is a labor of love that takes 3 days to complete.',
        images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg'
        ]
    };

    it('should render all content when craftsmanship data exists', () => {
        render(<CraftsmanshipSection craftsmanshipContent={mockCraftsmanshipData} />);

        expect(screen.getByText('Craftsmanship Story')).toBeInTheDocument();
        expect(screen.getByText('Origin')).toBeInTheDocument();
        expect(screen.getByText(mockCraftsmanshipData.origin_story)).toBeInTheDocument();
        expect(screen.getByText('Materials')).toBeInTheDocument();
        expect(screen.getByText(mockCraftsmanshipData.material_details)).toBeInTheDocument();
        expect(screen.getByText('Artisan Note')).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
    });

    it('should not render section when craftsmanship data is null', () => {
        const { container } = render(<CraftsmanshipSection craftsmanshipContent={null} />);
        expect(container.firstChild).toBeNull();
    });

    it('should handle missing images gracefully', () => {
        const dataWithoutImages: CraftsmanshipContent = {
            ...mockCraftsmanshipData,
            images: []
        };

        render(<CraftsmanshipSection craftsmanshipContent={dataWithoutImages} />);
        expect(screen.getByText('Craftsmanship Story')).toBeInTheDocument();
        expect(screen.queryAllByRole('img')).toHaveLength(0);
    });
});
