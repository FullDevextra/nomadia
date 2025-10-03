import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // ✅ Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    const { applicant } = await req.json();

    // ✅ Send Email with Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer re_H64cBbSz_7fiyFbGCC7BwEQKCEFY5d7Pp",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nomadia <onboarding@resend.dev>", // use verified sender
        to: ["richiemighty2020@gmail.com"],
        subject: "🎉 New Applicant Submitted!",
        html: `
          <h2>📬 New Application Received</h2>
          <p><b>Name:</b> ${applicant.first_name} ${applicant.last_name}</p>
          <p><b>Email:</b> ${applicant.email}</p>
          <p><b>Phone:</b> ${applicant.phone}</p>
          <p><b>SSN:</b> ${applicant.ssn || "N/A"}</p>
          <p><b>Resume:</b> <a href="${applicant.resume_url}" target="_blank">View Resume</a></p>
          <p><b>ID Card:</b> <a href="${applicant.id_card_url}" target="_blank">View ID</a></p>
        `,
      }),
    });

    // ✅ Log and return Resend API response
    const resendResponse = await response.json();
    console.log("📬 Resend response:", resendResponse);

    return new Response(
      JSON.stringify({ success: true, resendResponse }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // allow frontend
        },
      }
    );

  } catch (err) {
    console.error("❌ Error sending email:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
