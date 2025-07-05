"use client"

import { useQuery } from "@tanstack/react-query"
import { getPosts } from "@/lib/api"
import { Post } from "@/types/post"
import { 
  Card, 
  CardContent, 
  // CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  User, 
  Calendar,
  Eye,
  MoreHorizontal,
  BookOpen
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

function PostCard({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showFullContent, setShowFullContent] = useState(false)
  const router = useRouter()

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  const handlePostClick = () => {
    router.push(`/posts/${post.id}`)
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handlePostClick}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">User {post.userId}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>2 hours ago</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleButtonClick}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        <div>
          <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            Post #{post.id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {showFullContent ? post.body : truncateText(post.body, 200)}
            {post.body.length > 200 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowFullContent(!showFullContent)
                }}
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                {showFullContent ? "Show less" : "Read more"}
              </button>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                handleButtonClick(e)
                setIsLiked(!isLiked)
              }}
              className={`transition-all duration-200 ${
                isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">24</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-blue-500 transition-colors"
              onClick={handleButtonClick}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              <span className="text-sm">8</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-green-500 transition-colors"
              onClick={handleButtonClick}
            >
              <Share2 className="w-4 h-4 mr-1" />
              <span className="text-sm">Share</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                handleButtonClick(e)
                setIsBookmarked(!isBookmarked)
              }}
              className={`transition-all duration-200 ${
                isBookmarked 
                  ? 'text-yellow-500 hover:text-yellow-600' 
                  : 'text-gray-500 hover:text-yellow-500'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </Button>

            <div className="flex items-center space-x-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">156</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PostCardSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-16" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  // const router = useRouter()
  
  // Enable the API call to fetch actual data
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    // Removed enabled: false to allow the API call
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Blog Posts
              </h1>
            </div>
            <p className="text-gray-600 text-lg">Discover amazing content from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600">Unable to load posts. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog Posts
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing content from our community. Read, engage, and share your thoughts with fellow readers.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="text-sm">
              {posts?.length || 0} posts available
            </Badge>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {posts?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Be the first to share your thoughts with the community!</p>
          </div>
        )}
      </div>
    </div>
  )
}