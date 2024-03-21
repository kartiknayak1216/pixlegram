"use client"
import React, { Suspense } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreatePost } from '@/lib/zodschema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { UploadButton } from '@/components/uploadingthing';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { createpost } from '@/lib/action';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Createskelton } from '@/components/skelton/Homecardshelton';

export default function Page() {
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: '',
      fileUrl: undefined,
    },
  });

  const fileUrl = form.watch('fileUrl');
  const path = usePathname();
  const currentpath = path === '/create';
  const route = useRouter();

  async function onSubmit(values: z.infer<typeof CreatePost>) {
    const req = await createpost(values);
    if (req) {
      console.log(req);
      toast.error('Failed to create post');
    } else {
      toast.success('Post created successfully');
    }
  }

  return (
    
    
    <div>
      <Suspense fallback={<Createskelton/>}>
    <Dialog
      open={currentpath}
      onOpenChange={(open) => !open && route.back()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new post</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const res = await createpost(values);
              if (res) {
                return toast.error(`${res}`);
              }
              else{
                return toast.success("Post created sucessfully")
              }
            })}
            className="space-y-4"
          >
            {!!fileUrl ? (
              <div className="h-96 md:h-[450px] overflow-hidden rounded-md">
                <AspectRatio ratio={1 / 1} className="relative h-full ">
                  
                  <Image
                    src={fileUrl}
                    alt="Post preview"
                    fill
                    className=" object-cover transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
                  />
                </AspectRatio>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor="picture">Picture</FormLabel>
                    <FormControl>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("fileUrl", res[0].url);
                          toast.success("Upload complete");
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error("Upload failed");
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a picture to post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!!fileUrl && (
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="caption">Caption</FormLabel>
                    <FormControl>
                      <Input
                        type="caption"
                        id="caption"
                        placeholder="Write a caption..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Create Post
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </Suspense>
  </div>
  );
}
