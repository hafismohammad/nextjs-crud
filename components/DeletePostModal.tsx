"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePost } from "@/lib/api"
import { Post } from "@/types/post"
import { Trash, AlertTriangle, X } from "lucide-react"
import { useState } from "react"

interface DeletePostModalProps {
  post: Post
}

export default function DeletePostModal({ post }: DeletePostModalProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      // Optimistically update the cache by removing the deleted post
      queryClient.setQueryData<Post[]>(["posts"], (oldData) => {
        if (!oldData) return []
        
        return oldData.filter(p => p.id !== post.id)
      })
      
      setOpen(false)
    },
    onError: (error) => {
      console.error('Error deleting post:', error)
    }
  })

  const handleDelete = () => {
    mutation.mutate(post.id)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm"
          className="hover:bg-red-600 transition-colors duration-200"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-red-800">
                Delete Post
              </DialogTitle>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-800">Warning</h4>
                <p className="text-sm text-red-700 mt-1">
                  Are you sure you want to delete this post? This action cannot be undone and will permanently remove the post from your account.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Post to be deleted:
            </label>
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.body}
                  </p>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
            className="hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={mutation.isPending}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {mutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Delete Post
              </>
            )}
          </Button>
        </div>
        
        {mutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
              <p className="text-sm text-red-700 font-medium">
                Error deleting post. Please try again.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}