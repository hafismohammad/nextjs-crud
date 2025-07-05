"use client"

import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost } from "@/lib/api"
import { NewPost, Post } from "@/types/post"
import { Plus, Sparkles, FileText } from "lucide-react"
import { useState } from "react"

export default function CreatePostModal() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost),
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData<Post[]>(["posts"], (oldData) => {
        if (!oldData) return [newPost]
        
        const maxId = Math.max(...oldData.map(post => post.id), 0)
        const postWithNewId = {
          ...newPost,
          id: maxId + 1
        }
        
        return [postWithNewId, ...oldData]
      })
      
      setOpen(false)
    },
    onError: (error) => {
      console.error('Error creating post:', error)
    }
  })

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters")
      .required("Title is required"),
    body: Yup.string()
      .min(10, "Body must be at least 10 characters")
      .max(1000, "Body must be less than 1000 characters")
      .required("Body is required"),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Create New Post</DialogTitle>
              <p className="text-sm text-gray-500">Share your thoughts with the world</p>
            </div>
          </div>
        </DialogHeader>

        <Formik
          initialValues={{ title: "", body: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            mutation.mutate(
              {
                title: values.title,
                body: values.body,
                userId: 1,
              },
              {
                onSuccess: () => {
                  resetForm()
                },
              }
            )
          }}
        >
          {({ isSubmitting, values,  }) => (
            <Form className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Post Title
                </Label>
                <Field 
                  name="title" 
                  as={Input} 
                  placeholder="Enter an engaging title..."
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="title" />
                  </div>
                  <div className="text-xs text-gray-500">
                    {values.title.length}/100
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body" className="text-sm font-medium text-gray-700">
                  Post Content
                </Label>
                <Field 
                  name="body" 
                  as={Textarea} 
                  placeholder="Write your post content here..."
                  rows={6}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="body" />
                  </div>
                  <div className="text-xs text-gray-500">
                    {values.body.length}/1000
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || mutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting || mutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Create Post
                    </>
                  )}
                </Button>
              </div>
              
              {mutation.isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                    <p className="text-sm text-red-700 font-medium">
                      Error creating post. Please try again.
                    </p>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}