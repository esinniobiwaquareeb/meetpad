"use client";
import Loader from "@/components/common/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { P } from "@/components/ui/typography";
import { createClient } from "@/utils/supabase/client";
import { Check, Info } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function InputUsername({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const database = createClient();
  const previousUserName = defaultValue;
  const [username, setUsername] = useState(defaultValue);
  const [isValidating, setIsValidating] = useState(false);
  const [isTaken, setIsTaken] = useState(false);

  useEffect(() => {
    async function validateUsername() {
      setIsValidating(true);
      const { data } = await database
        .from("user")
        .select("username")
        .eq("username", username)
        .single();

      if (data?.username && data.username !== previousUserName) {
        setIsTaken(true);
      } else setIsTaken(false);

      setIsValidating(false);
    }

    validateUsername();
  }, [username, database, previousUserName]);

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto] items-center gap-4">
        <Input
          type="text"
          value={username}
          name="username"
          onChange={handleChangeUsername}
          className={`w-full ${
            isTaken || !username ? "focus-visible:ring-red-700" : ""
          }`}
          spellCheck={false}
        />
        {isValidating && !isTaken && username && <Loader />}

        {!isValidating && !isTaken && username && (
          <Check size={20} strokeWidth={3} className="stroke-green-700" />
        )}
      </div>
      {isTaken || !username ? (
        <div className="flex items-center gap-2 mt-2">
          <Info size={18} className="stroke-red-700" />
          <P size="xs" className="text-red-700">
            {!username ? "Enter a valid username" : "Username already exist"}
          </P>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
