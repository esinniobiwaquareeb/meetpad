"use client";
import { Country } from "react-phone-number-input";
import { LeftPanel } from "../booking/left-panel";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Heading } from "../ui/Heading";
import { useBookingState } from "./booking-context";
import PhoneInput from "../ui/phone-input";
import { useEffect, useRef, useState } from "react";
import { P } from "../ui/typography";
import { validateEmail } from "@/lib/utils";

export default function DetailsScreen() {
  const { user } = useBookingState();
  const { guest, dispatch } = useBookingState();
  const [error, setError] = useState({
    fullName: {
      message: "",
    },
    email: {
      message: "",
    },
    phoneNumber: {
      message: "",
    },
  });
  const justMount = useRef(false);

  useEffect(() => {
    dispatch({
      type: "guest/validate",
      payload:
        !error.email.message &&
        !error.fullName.message &&
        !error.phoneNumber.message,
    });
  }, [guest, dispatch, error, user.email]);

  useEffect(() => {
    if (guest.fullName === "")
      setError((error) => {
        return {
          ...error,
          fullName: {
            message: "Please provide your Full Name",
          },
        };
      });
    else
      setError((error) => {
        return {
          ...error,
          fullName: { message: "" },
        };
      });
  }, [guest.fullName]);

  useEffect(() => {
    if (!justMount.current) return;

    if (!validateEmail(guest.email) || user.email === guest.email)
      setError((error) => {
        return {
          ...error,
          email: {
            message: "Please provide a valid email address",
          },
        };
      });
    else if (user.email === guest.email)
      setError((error) => {
        return {
          ...error,
          email: {
            message: "Please provide your email address",
          },
        };
      });
    else
      setError((error) => {
        return {
          ...error,
          email: { message: "" },
        };
      });
  }, [guest, user]);

  return (
    <div>
      <div className="grid md:grid-cols-[0.5fr_1fr] gap-6">
        <LeftPanel />
        <div>
          <div className="mb-8 text-center">
            <Heading type="h6">
              Please provide your details to proceed with the booking
            </Heading>
          </div>
          <form>
            <div className="grid gap-6">
              <div>
                <Label>Full Name * {}</Label>
                <Input
                  type="text"
                  spellCheck={false}
                  value={guest.fullName}
                  onChange={(event) => {
                    dispatch({
                      type: "guest",
                      payload: { ...guest, fullName: event.target.value },
                    });
                  }}
                />
                {Boolean(error.fullName.message) && (
                  <P size="xs" className="text-red-800 dark:text-red-300">
                    {error.fullName.message}
                  </P>
                )}
              </div>
              <div>
                <Label>Email address *</Label>
                <Input
                  type="email"
                  value={guest.email}
                  onChange={(event) => {
                    justMount.current = true;
                    dispatch({
                      type: "guest",
                      payload: { ...guest, email: event.target.value },
                    });
                  }}
                />
                {Boolean(error.email.message) && (
                  <P size="xs" className="text-red-800 dark:text-red-300">
                    {error.email.message}
                  </P>
                )}
              </div>

              <div>
                <Label>Phone Number *</Label>
                <PhoneInput
                  defaultCountry={(guest.country_code as Country) ?? "NG"}
                  international
                  formNoValidate={true}
                  initialValueFormat="national"
                  onChange={(phoneNumber) => {
                    dispatch({
                      type: "guest",
                      payload: { ...guest, phoneNumber },
                    });
                  }}
                />
              </div>
              <div>
                <Label>Notes (optional)</Label>
                <Textarea
                  placeholder="Say something..."
                  value={guest.note}
                  onChange={(event) =>
                    dispatch({
                      type: "guest",
                      payload: { ...guest, note: event.target.value },
                    })
                  }
                ></Textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
