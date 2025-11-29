import { Card, CardContent } from '@/components/ui/card';

const timelineData = [
  {
    year: '2010',
    title: 'Factory Founded',
    description: 'Established with a vision to create ethical fashion manufacturing rooted in traditional craftsmanship and sustainable practices.',
  },
  {
    year: '2013',
    title: 'Sustainable Practices',
    description: 'Implemented water recycling systems and solar energy infrastructure to minimize environmental impact.',
  },
  {
    year: '2016',
    title: 'Fair Trade Certified',
    description: 'Achieved Fair Trade certification, ensuring fair wages and safe working conditions for all artisans.',
  },
 {
    year: '2019',
    title: 'Organic Materials',
    description: 'Transitioned to 100% organic and sustainably sourced materials, maintaining our commitment to the environment.',
  },
  {
    year: '2022',
    title: 'Zero Waste Initiative',
    description: 'Launched our zero-waste production process, repurposing fabric scraps into new products and accessories.',
  },
];

export function TimelineSection() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-16">Our Journey</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-muted hidden md:block"></div>
        
        <div className="space-y-16 md:space-y-0">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <Card className="bg-card border border-border">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-foreground">{item.year}</h3>
                    <h4 className="text-lg font-serif text-foreground mt-3">{item.title}</h4>
                    <p className="text-muted-foreground mt-4 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="hidden md:block w-1/12 flex justify-center">
                <div className="w-4 h-4 rounded-full bg-primary z-10"></div>
              </div>
              
              <div className="w-full md:w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}