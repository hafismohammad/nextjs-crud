"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, } from "lucide-react"
import { Post } from "@/types/post"
import { useState } from "react"

interface ViewPostModalProps {
  post: Post
}

export default function ViewPostModal({ post }: ViewPostModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hover:bg-gray-50">
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">View Post</DialogTitle>
              <p className="text-sm text-gray-500">Post details and content</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <span>Title</span>
            </label>
            <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                {post.title}
              </h3>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg min-h-[200px]">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {post.body}
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button 
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}