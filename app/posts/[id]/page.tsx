// app/posts/[id]/page.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import { getPost } from "@/lib/api"
// import { Post } from "@/types/post"
import { 
  Card, 
  CardContent, 
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
  ArrowLeft,
  BookOpen,
  Clock,
  Tag
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

function PostDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-6">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-10 w-16" />
                  <Skeleton className="h-10 w-20" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function PostDetailsPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const router = useRouter()
  const params = useParams()
  const postId = parseInt(params.id as string)

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    enabled: !!postId,
  })

  if (isLoading) {
    return <PostDetailsSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600 mb-4">The post you re looking for doesn t exist or has been removed.</p>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
        </div>

        {/* Post Details */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="space-y-6">
              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">User {post.userId}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Title and Badge */}
              <div className="space-y-4">
                <CardTitle className="text-3xl font-bold text-gray-900 leading-tight">
                  {post.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    Post #{post.id}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Article
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Post Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {post.body}
                </p>
              </div>

              {/* Engagement Section */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`transition-all duration-200 ${
                      isLiked 
                        ? 'text-red-500 hover:text-red-600 bg-red-50' 
                        : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">24 Likes</span>
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span className="font-medium">8 Comments</span>
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    <span className="font-medium">Share</span>
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`transition-all duration-200 ${
                      isBookmarked 
                        ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50' 
                        : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50'
                    }`}
                  >
                    <BookOpen className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>

                  <div className="flex items-center space-x-2 text-gray-500">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">1.2k views</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">About this post</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Author ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{post.userId}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Post ID:</span>
                    <span className="ml-2 font-medium text-gray-900">{post.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium text-gray-900">General</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}