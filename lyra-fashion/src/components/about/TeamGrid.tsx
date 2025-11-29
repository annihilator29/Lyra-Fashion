import { Card, CardContent } from '@/components/ui/card';

const teamMembers = [
  {
    name: 'Ram Sharma',
    role: 'Head Tailor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sita Devi',
    role: 'Quality Control',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Arashad Khan',
    role: 'Sustainable Materials',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Priya Tamanag',
    role: 'Design Specialist',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Rajesh Gupta',
    role: 'Production Manager',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Meera Joshi',
    role: 'Ethics Coordinator',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  },
];

export function TeamGrid() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">Meet Our Artisans</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden border border-border">
            <div className="aspect-square overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-serif font-bold text-foreground">{member.name}</h3>
              <p className="text-muted-foreground mt-3 font-serif">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}