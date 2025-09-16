import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VisitorTrackingRequest {
  email?: string;
  userAgent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { email, userAgent }: VisitorTrackingRequest = await req.json();
    const clientIP = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    console.log("Tracking visitor:", { email, clientIP, userAgent });

    let isNewVisitor = false;

    if (email) {
      // Check if visitor with this email exists using secure function
      const { data: visitorInfo } = await supabase
        .rpc('get_email_visitor_info', { visitor_email: email });

      if (visitorInfo && visitorInfo.length > 0) {
        // Update existing visitor
        await supabase
          .from("visitors")
          .update({
            last_visit_at: new Date().toISOString(),
            visit_count: visitorInfo[0].visit_count + 1,
            ip_address: clientIP,
            user_agent: userAgent,
          })
          .eq("id", visitorInfo[0].visitor_id);
      } else {
        // Create new visitor record
        const { error } = await supabase
          .from("visitors")
          .insert({
            email,
            ip_address: clientIP,
            user_agent: userAgent,
          });

        if (error) {
          console.error("Error inserting visitor:", error);
        } else {
          isNewVisitor = true;
        }
      }
    } else {
      // Track anonymous visitor by IP using secure function
      const { data: visitorInfo } = await supabase
        .rpc('get_anonymous_visitor_info', { visitor_ip: clientIP });

      if (visitorInfo && visitorInfo.length > 0) {
        // Update existing anonymous visitor
        await supabase
          .from("visitors")
          .update({
            last_visit_at: new Date().toISOString(),
            visit_count: visitorInfo[0].visit_count + 1,
            user_agent: userAgent,
          })
          .eq("id", visitorInfo[0].visitor_id);
      } else {
        // Create new anonymous visitor record
        const { error } = await supabase
          .from("visitors")
          .insert({
            ip_address: clientIP,
            user_agent: userAgent,
          });

        if (error) {
          console.error("Error inserting anonymous visitor:", error);
        } else {
          isNewVisitor = true;
        }
      }
    }

    // Send email notification for new visitors (with email)
    if (isNewVisitor && email) {
      try {
        await resend.emails.send({
          from: "Portfolio <onboarding@resend.dev>",
          to: ["your-email@example.com"], // Replace with your email
          subject: "New Visitor on Your Portfolio!",
          html: `
            <h2>New Visitor Alert!</h2>
            <p>A new visitor has accessed your portfolio website:</p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>IP Address:</strong> ${clientIP}</li>
              <li><strong>User Agent:</strong> ${userAgent}</li>
              <li><strong>Visit Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
            <p>Great job on attracting new visitors to your portfolio!</p>
          `,
        });
        console.log("Email notification sent for new visitor");
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
    }

    // Get visitor statistics using secure function
    const { data: statsData, error: statsError } = await supabase
      .rpc('get_visitor_stats');

    if (statsError) {
      console.error('Error fetching visitor stats:', statsError);
      return new Response(JSON.stringify({
        success: true,
        isNewVisitor,
        totalVisitors: 0,
        uniqueVisitors: 0,
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    const totalVisitors = statsData?.[0]?.total_visitors || 0;
    const uniqueVisitors = statsData?.[0]?.unique_visitors || 0;

    return new Response(JSON.stringify({
      success: true,
      isNewVisitor,
      totalVisitors: totalVisitors || 0,
      uniqueVisitors: uniqueVisitors || 0,
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in track-visitor function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);