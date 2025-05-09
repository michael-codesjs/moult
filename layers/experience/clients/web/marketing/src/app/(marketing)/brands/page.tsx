'use client'

import Link from 'next/link';
import { Header } from '@/layout/header';
import { BottomNavigation } from '@/layout/navigation';

// Sample data for partner brands
const partnerBrands = [
  {
    id: 'markham',
    name: 'Markham',
    logo: '/logos/markham.svg',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-2',
    products: 156,
    virtualModels: 78
  },
  {
    id: 'golfwang',
    name: 'Golf Wang',
    logo: '/logos/golfwang.svg',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 83,
    virtualModels: 42
  },
  {
    id: 'rickowens',
    name: 'Rick Owens',
    logo: '/logos/rickowens.svg',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-2',
    products: 91,
    virtualModels: 47
  },
  {
    id: 'nike',
    name: 'Nike',
    logo: '/logos/nike.svg',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-2',
    products: 124,
    virtualModels: 58
  },
  {
    id: 'adidas',
    name: 'Adidas',
    logo: '/logos/adidas.svg',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 93,
    virtualModels: 42
  },
  {
    id: 'puma',
    name: 'Puma',
    logo: '/logos/puma.svg',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 68,
    virtualModels: 31
  },
  {
    id: 'reebok',
    name: 'Reebok',
    logo: '/logos/reebok.svg',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-2',
    products: 54,
    virtualModels: 27
  },
  {
    id: 'nb',
    name: 'New Balance',
    logo: '/logos/nb.svg',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 47,
    virtualModels: 22
  },
  {
    id: 'uniqlo',
    name: 'Uniqlo',
    logo: '/logos/uniqlo.svg',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 135,
    virtualModels: 78
  },
  {
    id: 'zara',
    name: 'Zara',
    logo: '/logos/zara.svg',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 217,
    virtualModels: 95
  },
  {
    id: 'hm',
    name: 'H&M',
    logo: '/logos/hm.svg',
    image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 183,
    virtualModels: 64
  },
  {
    id: 'gap',
    name: 'Gap',
    logo: '/logos/gap.svg',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 76,
    virtualModels: 35
  },
  {
    id: 'levis',
    name: 'Levi\'s',
    logo: '/logos/levis.svg',
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 92,
    virtualModels: 47
  },
  {
    id: 'versace',
    name: 'Versace',
    logo: '/logos/versace.svg',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 89,
    virtualModels: 41
  },
  {
    id: 'gucci',
    name: 'Gucci',
    logo: '/logos/gucci.svg',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 87,
    virtualModels: 51
  },
  // Additional partner brands
  {
    id: 'balenciaga',
    name: 'Balenciaga',
    logo: '/logos/balenciaga.svg',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 78,
    virtualModels: 36
  },
  {
    id: 'burberry',
    name: 'Burberry',
    logo: '/logos/burberry.svg',
    image: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 78,
    virtualModels: 36
  },
  {
    id: 'dior',
    name: 'Dior',
    logo: '/logos/dior.svg',
    image: 'https://images.unsplash.com/photo-1599593752325-ffa41031056e?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-2',
    products: 94,
    virtualModels: 42
  },
  {
    id: 'fendi',
    name: 'Fendi',
    logo: '/logos/fendi.svg',
    image: 'https://images.unsplash.com/photo-1551533257-bbd74dff1f8a?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 67,
    virtualModels: 29
  },
  {
    id: 'lacoste',
    name: 'Lacoste',
    logo: '/logos/lacoste.svg',
    image: 'https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 72,
    virtualModels: 33
  },
  {
    id: 'kappa',
    name: 'Kappa',
    logo: '/logos/kappa.svg',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 67,
    virtualModels: 31
  },
  {
    id: 'calvinklein',
    name: 'Calvin Klein',
    logo: '/logos/calvinklein.svg',
    image: 'https://images.unsplash.com/photo-1531925470851-1b5896b67dcd?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 83,
    virtualModels: 37
  },
  // Additional 20 more brands
  {
    id: 'chanel',
    name: 'Chanel',
    logo: '/logos/chanel.svg',
    image: 'https://images.unsplash.com/photo-1512646605205-78422b7c7896?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 112,
    virtualModels: 53
  },
  {
    id: 'louisvuitton',
    name: 'Louis Vuitton',
    logo: '/logos/louisvuitton.svg',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 134,
    virtualModels: 62
  },
  {
    id: 'prada',
    name: 'Prada',
    logo: '/logos/prada.svg',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 88,
    virtualModels: 41
  },
  {
    id: 'tommyhilfiger',
    name: 'Tommy Hilfiger',
    logo: '/logos/tommyhilfiger.svg',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 74,
    virtualModels: 34
  },
  {
    id: 'supreme',
    name: 'Supreme',
    logo: '/logos/supreme.svg',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 62,
    virtualModels: 28
  },
  {
    id: 'champion',
    name: 'Champion',
    logo: '/logos/champion.svg',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 81,
    virtualModels: 37
  },
  {
    id: 'armani',
    name: 'Armani',
    logo: '/logos/armani.svg',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-2',
    products: 97,
    virtualModels: 45
  },
  {
    id: 'hermes',
    name: 'Hermès',
    logo: '/logos/hermes.svg',
    image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 105,
    virtualModels: 48
  },
  {
    id: 'bottegaveneta',
    name: 'Bottega Veneta',
    logo: '/logos/bottegaveneta.svg',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 69,
    virtualModels: 31
  },
  {
    id: 'dolcegabbana',
    name: 'Dolce & Gabbana',
    logo: '/logos/dg.svg',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 91,
    virtualModels: 43
  },
  {
    id: 'underarmour',
    name: 'Under Armour',
    logo: '/logos/underarmour.svg',
    image: 'https://images.unsplash.com/photo-1561069934-eee225952461?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 86,
    virtualModels: 39
  },
  {
    id: 'offwhite',
    name: 'Off-White',
    logo: '/logos/offwhite.svg',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 73,
    virtualModels: 34
  },
  {
    id: 'moncler',
    name: 'Moncler',
    logo: '/logos/moncler.svg',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 65,
    virtualModels: 30
  },
  {
    id: 'stone-island',
    name: 'Stone Island',
    logo: '/logos/stoneisland.svg',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 59,
    virtualModels: 26
  },
  {
    id: 'ralphlauren',
    name: 'Ralph Lauren',
    logo: '/logos/ralphlauren.svg',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 128,
    virtualModels: 60
  },
  {
    id: 'northface',
    name: 'The North Face',
    logo: '/logos/northface.svg',
    image: 'https://images.unsplash.com/photo-1549834185-bd9f078a5dfe?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 94,
    virtualModels: 44
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    logo: '/logos/patagonia.svg',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 78,
    virtualModels: 35
  },
  {
    id: 'balmain',
    name: 'Balmain',
    logo: '/logos/balmain.svg',
    image: 'https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 61,
    virtualModels: 28
  },
  {
    id: 'asics',
    name: 'ASICS',
    logo: '/logos/asics.svg',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 65,
    virtualModels: 29
  },
  {
    id: 'vans',
    name: 'Vans',
    logo: '/logos/vans.svg',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 83,
    virtualModels: 38
  },
  // Additional 20 more brands
  {
    id: 'converse',
    name: 'Converse',
    logo: '/logos/converse.svg',
    image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 79,
    virtualModels: 36
  },
  {
    id: 'timberland',
    name: 'Timberland',
    logo: '/logos/timberland.svg',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 68,
    virtualModels: 32
  },
  {
    id: 'clarks',
    name: 'Clarks',
    logo: '/logos/clarks.svg',
    image: 'https://images.unsplash.com/photo-1512675828443-4f454c42253a?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 71,
    virtualModels: 33
  },
  {
    id: 'lululemon',
    name: 'Lululemon',
    logo: '/logos/lululemon.svg',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 97,
    virtualModels: 45
  },
  {
    id: 'columbia',
    name: 'Columbia',
    logo: '/logos/columbia.svg',
    image: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 82,
    virtualModels: 38
  },
  {
    id: 'rayban',
    name: 'Ray-Ban',
    logo: '/logos/rayban.svg',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 56,
    virtualModels: 24
  },
  {
    id: 'fossil',
    name: 'Fossil',
    logo: '/logos/fossil.svg',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 63,
    virtualModels: 29
  },
  {
    id: 'drmartens',
    name: 'Dr. Martens',
    logo: '/logos/drmartens.svg',
    image: 'https://images.unsplash.com/photo-1460066122679-741dd6c4ad37?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 49,
    virtualModels: 22
  },
  {
    id: 'crocs',
    name: 'Crocs',
    logo: '/logos/crocs.svg',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 51,
    virtualModels: 24
  },
  {
    id: 'carhartt',
    name: 'Carhartt',
    logo: '/logos/carhartt.svg',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 78,
    virtualModels: 36
  },
  {
    id: 'michaelkors',
    name: 'Michael Kors',
    logo: '/logos/michaelkors.svg',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 87,
    virtualModels: 40
  },
  {
    id: 'brooks',
    name: 'Brooks',
    logo: '/logos/brooks.svg',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 58,
    virtualModels: 27
  },
  {
    id: 'thenorthface',
    name: 'The North Face',
    logo: '/logos/thenorthface.svg',
    image: 'https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 93,
    virtualModels: 42
  },
  {
    id: 'lecoqsportif',
    name: 'Le Coq Sportif',
    logo: '/logos/lecoqsportif.svg',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 64,
    virtualModels: 29
  },
  {
    id: 'coach',
    name: 'Coach',
    logo: '/logos/coach.svg',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 76,
    virtualModels: 35
  },
  {
    id: 'katespade',
    name: 'Kate Spade',
    logo: '/logos/katespade.svg',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 69,
    virtualModels: 32
  },
  {
    id: 'swatch',
    name: 'Swatch',
    logo: '/logos/swatch.svg',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 54,
    virtualModels: 25
  },
  {
    id: 'fjallraven',
    name: 'Fjällräven',
    logo: '/logos/fjallraven.svg',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-2',
    products: 61,
    virtualModels: 27
  },
  {
    id: 'birkenstock',
    name: 'Birkenstock',
    logo: '/logos/birkenstock.svg',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 52,
    virtualModels: 24
  },
  {
    id: 'allsaints',
    name: 'AllSaints',
    logo: '/logos/allsaints.svg',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&q=60',
    size: 'col-span-2 row-span-1',
    products: 77,
    virtualModels: 35
  },
  // Add two more brands to fill empty grid spaces
  {
    id: 'oakley',
    name: 'Oakley',
    logo: '/logos/oakley.svg',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 65,
    virtualModels: 28
  },
  {
    id: 'mango',
    name: 'Mango',
    logo: '/logos/mango.svg',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&q=60',
    size: 'col-span-1 row-span-1',
    products: 93,
    virtualModels: 43
  },
];

// Platform statistics
const platformStats = [
  { label: 'Partner Brands', value: partnerBrands.length },
  { label: 'Total Products', value: partnerBrands.reduce((sum, brand) => sum + brand.products, 0) },
  { label: '3D Models', value: partnerBrands.reduce((sum, brand) => sum + brand.virtualModels, 0) },
  { label: 'Daily Visitors', value: '12K+' }
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Our Partner Brands</h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Explore our ecosystem of fashion forward partners bringing you the latest in immersive shopping experiences
            </p>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {platformStats.map((stat, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-white/5 p-6 rounded-xl">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Virtual Showroom Promo */}
          <div className="mb-16 rounded-2xl overflow-hidden relative">
            <div className="h-64 md:h-80 w-full relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=1200&auto=format&q=60" 
                alt="Virtual Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 max-w-lg">
                <div className="text-sm text-gray-300 mb-2">EXCLUSIVE EXPERIENCE</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Virtual Showrooms</h2>
                <p className="text-gray-300 mb-6">Step into immersive digital spaces created by top fashion brands. Experience collections in stunning 3D detail.</p>
                <Link href="/showrooms" className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Explore Showrooms
                </Link>
              </div>
            </div>
          </div>
            
          {/* Brands Grid - Photo Grid Style */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Partner Brands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
              {partnerBrands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.id}`}
                  className={`${brand.size} rounded-lg overflow-hidden relative group`}
                >
                  {/* Brand image */}
                  <div className="absolute inset-0 w-full h-full">
                    <img 
                      src={brand.image} 
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                  </div>
                  
                  {/* Brand information */}
                  <div className="relative h-full flex flex-col justify-end p-5">
                    <div className="text-white font-medium text-xl">{brand.name}</div>
                    <div className="text-gray-300 text-xs mt-1">
                      <span>{brand.products} Products</span>
                      <span className="mx-1">•</span>
                      <span>{brand.virtualModels} 3D</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Join as Partner CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block p-[1px] rounded-xl bg-gradient-to-r from-gray-500 to-gray-700">
              <Link
                href="/partner"
                className="block bg-gray-900 rounded-lg px-8 py-4 font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Become a Partner
              </Link>
            </div>
            <p className="mt-4 text-gray-400 max-w-md mx-auto">
              Join our platform and bring your brand into the digital dimension with 3D, AR, and VR experiences
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2023 moult. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 