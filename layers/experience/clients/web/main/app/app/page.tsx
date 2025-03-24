'use client'

import { useState } from 'react'
import {
  Sparkles,
  TrendingUp,
  Star,
  Brain,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Users,
  Zap,
  ShoppingBag,
  Plus,
  ChevronRight,
  Box,
  Glasses,
  X,
  SlidersHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Drawer } from '@/components/ui/drawer'
import { Search } from '@/components/ui/search'

// Custom Hanger Icon SVG Component
function HangerIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c1.1 0 2 .9 2 2 0 .7-.4 1.3-.9 1.7L13 7l-1 8-1-8-.1-.3C10.4 6.3 10 5.7 10 5c0-1.1.9-2 2-2z" />
      <path d="M3 19l9-9 9 9" />
      <line x1="3" y1="19" x2="21" y2="19" />
    </svg>
  )
}

const stories = [
  {
    id: 1,
    user: {
      name: 'Nike',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      isVerified: true,
    },
    title: 'Air Max',
  },
  {
    id: 2,
    user: {
      name: 'Gucci',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      isVerified: true,
    },
    title: 'New Collection',
  },
  {
    id: 3,
    user: {
      name: 'Balenciaga',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
      isVerified: true,
    },
    title: 'Runway',
  },
  {
    id: 4,
    user: {
      name: 'Prada',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
      isVerified: true,
    },
    title: 'Fall 2024',
  },
  {
    id: 5,
    user: {
      name: 'Zara',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      isVerified: true,
    },
    title: 'Summer Edit',
  },
  {
    id: 6,
    user: {
      name: 'Dior',
      image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b',
      isVerified: true,
    },
    title: 'Haute Couture',
  },
  {
    id: 7,
    user: {
      name: 'Fendi',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      isVerified: true,
    },
    title: 'Latest Drop',
  },
  {
    id: 8,
    user: {
      name: 'YSL',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
      isVerified: true,
    },
    title: 'Accessories',
  },
  {
    id: 9,
    user: {
      name: 'Versace',
      image: 'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b',
      isVerified: true,
    },
    title: "Spring '24",
  },
  {
    id: 10,
    user: {
      name: 'Chanel',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
      isVerified: true,
    },
    title: 'Paris Show',
  },
  {
    id: 11,
    user: {
      name: 'Hermès',
      image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8',
      isVerified: true,
    },
    title: 'Leather Edit',
  },
  {
    id: 12,
    user: {
      name: 'Burberry',
      image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d',
      isVerified: true,
    },
    title: 'Heritage',
  },
  {
    id: 13,
    user: {
      name: 'Bottega',
      image: 'https://images.unsplash.com/photo-1550014797-40c5daf7c6b1',
      isVerified: true,
    },
    title: 'New Season',
  },
  {
    id: 14,
    user: {
      name: 'Loewe',
      image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
      isVerified: true,
    },
    title: 'Artisan',
  },
  {
    id: 15,
    user: {
      name: 'Celine',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985',
      isVerified: true,
    },
    title: 'Modern Prep',
  },
  {
    id: 16,
    user: {
      name: 'Valentino',
      image: 'https://images.unsplash.com/photo-1549298916-f52d724204b4',
      isVerified: true,
    },
    title: 'Red Magic',
  },
]

const forYouProducts = [
  {
    name: 'Cyber Neon Jacket',
    type: 'Digital Wearable',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    match: '98% Match',
    isNew: true,
  },
  {
    name: 'HoloShift Boots',
    type: 'AR Footwear',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    match: '95% Match',
  },
  {
    name: 'Digital Denim',
    type: 'Smart Fabric',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    match: '92% Match',
  },
  {
    name: 'Meta Shades',
    type: 'AR Accessory',
    price: '$159',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    match: '89% Match',
    isNew: true,
  },
  {
    name: 'Quantum Dress',
    type: 'Digital Couture',
    price: '$399',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
    match: '87% Match',
  },
  {
    name: 'Neural Sneakers',
    type: 'Smart Footwear',
    price: '$279',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    match: '85% Match',
  },
]

const trendingPosts = [
  {
    user: {
      name: 'Sarah Chen',
      handle: '@sarahchen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      isVerified: true,
    },
    content: 'Just tried the new AR mirror feature - mind blown! 🤯',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
    likes: 234,
    comments: 45,
    products: [
      {
        name: 'AR Mirror',
        price: '$399',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
      },
    ],
  },
  {
    user: {
      name: 'Alex Rivera',
      handle: '@alexstyle',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
      isVerified: true,
    },
    content: 'New drop alert! 🔥 Rocking the Quantum collection at Milan Digital Fashion Week',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    likes: 567,
    comments: 89,
    products: [],
  },
  {
    user: {
      name: 'Emma Watson',
      handle: '@emmafashion',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      isVerified: true,
    },
    content:
      'Sustainable fashion meets digital innovation. These new eco-friendly materials in the metaverse are incredible! 🌱✨',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
    likes: 892,
    comments: 156,
    products: [],
  },
  {
    user: {
      name: 'Marcus Chen',
      handle: '@marcusdesign',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      isVerified: true,
    },
    content: 'Behind the scenes at our latest holographic fashion show. The future is here! 🌟',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    likes: 445,
    comments: 67,
    products: [],
  },
]

const liveEvents = [
  {
    title: 'Paris Digital Fashion Week',
    viewers: '2.5K watching',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    startTime: 'Live Now',
  },
  {
    title: 'Metaverse Fashion Show',
    viewers: 'Starting in 2h',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
    startTime: '2:00 PM',
  },
]

export default function AppPage() {
  const [activeTab, setActiveTab] = useState('tailored')
  const [activePopover, setActivePopover] = useState<string | null>(null)
  const [isHoveringPopover, setIsHoveringPopover] = useState(false)
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handlePopoverOpen = (productName: string) => {
    setActivePopover(productName)
  }

  const handlePopoverClose = () => {
    if (!isHoveringPopover) {
      setActivePopover(null)
    }
  }

  const handleDrawerOpen = (productName: string) => {
    setActiveDrawer(productName)
    document.body.style.overflow = 'hidden'
  }

  const handleDrawerClose = () => {
    setActiveDrawer(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* Search Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-[2.4px] border-b">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <Search />
        </div>
      </div>

      {/* Stories */}
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide p-[4px]">
            {stories.map(story => (
              <button key={story.id} className="flex flex-col items-center gap-1 min-w-[72px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full ring-2 ring-red-600 p-[2px]">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={story.user.image}
                        alt={story.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900 truncate w-full text-center">
                  {story.user.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('tailored')}
              className={`py-4 text-sm font-medium relative ${
                activeTab === 'tailored' ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              Tailored
              {activeTab === 'tailored' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`py-4 text-sm font-medium relative ${
                activeTab === 'following' ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              Following
              {activeTab === 'following' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Trending Now */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              <h2 className="font-medium">Trending Now</h2>
            </div>
            <Link href="/app/trending" className="text-sm text-pink-600">
              See all
            </Link>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <div className="relative aspect-[4/5] w-60 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                  alt="Fashion Week"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium mb-1">Paris Fashion Week</h3>
                  <p className="text-white/80 text-sm">Live Now</p>
                </div>
              </div>
              <div className="relative aspect-[4/5] w-60 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e"
                  alt="Digital Collection"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium mb-1">Digital Collection</h3>
                  <p className="text-white/80 text-sm">New Drop</p>
                </div>
              </div>
              <div className="relative aspect-[4/5] w-60 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b"
                  alt="Metaverse Show"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium mb-1">Metaverse Show</h3>
                  <p className="text-white/80 text-sm">Starting Soon</p>
                </div>
              </div>
              <div className="relative aspect-[4/5] w-60 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d"
                  alt="Virtual Runway"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium mb-1">Virtual Runway</h3>
                  <p className="text-white/80 text-sm">Exclusive Preview</p>
                </div>
              </div>
              <div className="relative aspect-[4/5] w-60 flex-shrink-0 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1511499767150-a48a237f0083"
                  alt="Designer Spotlight"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium mb-1">Designer Spotlight</h3>
                  <p className="text-white/80 text-sm">Featured Artists</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tailored Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h2 className="font-medium">Tailored for You</h2>
            </div>
            <Link href="/app/recommendations" className="text-sm text-purple-600">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {forYouProducts.map(product => (
              <div
                key={product.name}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  {/* Try-on Options Button - Adapts between mobile/desktop */}
                  <div className="absolute top-3 right-3">
                    <button
                      className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform group"
                      onMouseEnter={() => handlePopoverOpen(product.name)}
                      onMouseLeave={handlePopoverClose}
                      onClick={() => handleDrawerOpen(product.name)}
                    >
                      <HangerIcon className="w-4 h-4 text-purple-600 group-hover:animate-hanger-hover" />
                    </button>

                    {/* Desktop Popover - Only shown on lg screens */}
                    {activePopover === product.name && (
                      <div
                        className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-30 hidden lg:block"
                        onMouseEnter={() => setIsHoveringPopover(true)}
                        onMouseLeave={() => {
                          setIsHoveringPopover(false)
                          setActivePopover(null)
                        }}
                      >
                        <button className="w-full px-4 py-2.5 text-sm text-left hover:bg-purple-50 flex items-center gap-2 transition-colors">
                          <Box className="w-4 h-4 text-purple-600" />
                          <span>Try on in 3D</span>
                        </button>
                        <button className="w-full px-4 py-2.5 text-sm text-left hover:bg-purple-50 flex items-center gap-2 transition-colors">
                          <Glasses className="w-4 h-4 text-purple-600" />
                          <span>Try on in AR/VR</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{product.type}</p>
                  <p className="font-medium text-sm">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Posts */}
        {trendingPosts.map(post => (
          <div key={post.user.handle} className="bg-white rounded-2xl overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src={post.user.image} alt={post.user.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-medium">{post.user.name}</h3>
                  {post.user.isVerified && <Sparkles className="w-4 h-4 text-purple-600" />}
                </div>
                <p className="text-sm text-gray-500">{post.user.handle}</p>
              </div>
              <button className="ml-auto text-purple-600">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square">
              <Image src={post.image} alt="Post" fill className="object-cover" />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button className="text-gray-600 hover:text-purple-600">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="text-gray-600 hover:text-purple-600">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button className="text-gray-600 hover:text-purple-600">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
                <button className="text-gray-600 hover:text-purple-600">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>

              <p className="text-sm mb-2">
                <span className="font-medium">{post.likes.toLocaleString()}</span> likes
              </p>

              <p className="text-sm mb-2">
                <span className="font-medium">{post.user.name}</span> {post.content}
              </p>

              <button className="text-gray-500 text-sm">View all {post.comments} comments</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Bottom Drawer - Only rendered on mobile */}
      <div className="lg:hidden">
        <Drawer
          isOpen={!!activeDrawer}
          onClose={handleDrawerClose}
          overlayBottomNav={true}
          showHandle={false}
          showCloseButton={false}
        >
          <div className="space-y-2">
            <button className="w-full p-4 text-left hover:bg-purple-50 rounded-xl flex items-center gap-3 transition-colors">
              <Box className="w-5 h-5 text-purple-600" />
              <div>
                <span className="font-medium">Try on in 3D</span>
                <p className="text-sm text-gray-500">View this item in 3D space</p>
              </div>
            </button>
            <button className="w-full p-4 text-left hover:bg-purple-50 rounded-xl flex items-center gap-3 transition-colors">
              <Glasses className="w-5 h-5 text-purple-600" />
              <div>
                <span className="font-medium">Try on in AR/VR</span>
                <p className="text-sm text-gray-500">Experience in augmented reality</p>
              </div>
            </button>
          </div>
        </Drawer>
      </div>
    </div>
  )
}
