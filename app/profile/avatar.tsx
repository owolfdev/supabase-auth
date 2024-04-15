"use client";
import { useTransition, useEffect, useState } from "react";
import { uploadImageToServer } from "@/actions/actions";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function AvatarUploader() {
  let [isPending, startTransition] = useTransition();
  const [loggingOut, setLoggingOut] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  useEffect(() => {
    if (isPending) return;

    const supabase = createClient();

    const getAvatarImageFromSupabase = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user?.id);
      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();

      setImageUrl(profile?.avatar_url);
    };

    getAvatarImageFromSupabase();
  }, [isPending]);

  const uploadAction = async (formData: FormData) => {
    startTransition(() => {
      uploadImageToServer(formData);
    });
    setSelectedFileName(null);
  };

  const handleInputImage = (e: any) => {
    console.log("file input", e.target.files[0]);
    const file = e.target.files[0];
    setSelectedFileName(file.name);
    const fileSize = file.size / 1024 / 1024; // Convert bytes to megabytes
    const fileSizeRounded = parseFloat(fileSize.toFixed(1));
    if (fileSize > 1) {
      // Check if the file size is more than 1 MB
      setSelectedFileName(null);
      alert(
        `Error: The file size is over 1 megabyte. It's ${fileSizeRounded}MB. Please upload a smaller file.`
      );
    }
  };

  return (
    <div className="z-10 max-w-xl w-full justify-between flex flex-col pb-8">
      <p>
        <span className="font-bold">Avatar Image</span> (Max size 1MB)
      </p>
      <div className=" w-80 h-80 border border-black rounded relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="avatar"
            fill={true}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex flex-col justify-center">
            <p className="text-center p-8 text-black">
              {user ? (
                <span>Avatar Image</span>
              ) : (
                <span>You need to be logged in to see your avatar</span>
              )}
            </p>
          </div>
        )}
      </div>
      <form action={uploadAction} className="flex flex-col gap-2 pt-4">
        <div>
          <label
            htmlFor="file-upload"
            className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mt-2 cursor-pointer"
          >
            {!selectedFileName
              ? `Select New Avatar Image`
              : `${selectedFileName}`}
          </label>
          <input
            id="file-upload"
            type="file"
            name="file"
            onChange={handleInputImage}
            className="hidden"
          />
        </div>
        <div>
          {selectedFileName && (
            <button
              type="submit"
              className="bg-yellow-400 rounded-md px-4 py-2 text-foreground mt-2"
              onClick={() => {
                setImageUrl(null);
              }}
            >
              {isPending ? "Uploading..." : `Upload Image`}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
