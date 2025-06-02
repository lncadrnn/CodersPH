# EmailJS Setup Instructions for Coders PH Contact Form

## Current Status
🟡 **PARTIALLY CONFIGURED** - The contact form is working with a fallback system, but EmailJS needs to be properly set up for direct email delivery.

### What's Working Now:
- ✅ Contact form accepts submissions
- ✅ Shows success modal after submission
- ✅ Has fallback mailto functionality if EmailJS fails
- ✅ Form validation and loading states
- ✅ No more Outlook auto-opening

### What Needs Setup:
- 🔧 EmailJS account configuration
- 🔧 Replace placeholder keys with real ones
- 🔧 Test email delivery

## Quick Start
The form will work immediately with a fallback system that creates a mailto link. To get direct email delivery without opening email clients, follow the setup steps below.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account using your Gmail (`lanceadrn.acal@gmail.com`)
3. Verify your email address

## Step 2: Connect Your Gmail Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail**
4. Click **Connect Account** and authorize with your Gmail
5. Service ID should be: `service_coders_ph` (or update in main.js if different)

## Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Template ID should be: `template_contact` (or update in main.js if different)
4. Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Body:**
```
Hello Coders PH Team,

You have received a new message from your website contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from the Coders PH website contact form.
```

5. Click **Save**

## Step 4: Update Configuration in Code
1. Open `sub index/main.js`
2. Find the `EMAILJS_CONFIG` object (around line 135)
3. Replace the placeholder values:
   - **publicKey**: Replace `"VftWN8vG-w97xhRzP"` with your actual public key
   - **serviceId**: Replace `"service_coders_ph"` with your actual service ID (if different)
   - **templateId**: Replace `"template_contact"` with your actual template ID (if different)

## Step 5: Test the Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your Gmail for the email
5. Verify the success modal appears

## Current Configuration (In Code)
```javascript
const EMAILJS_CONFIG = {
  publicKey: "VftWN8vG-w97xhRzP", // ← Replace with your EmailJS public key
  serviceId: "service_coders_ph",   // ← Replace with your EmailJS service ID
  templateId: "template_contact"    // ← Replace with your EmailJS template ID
};
```

## Features Implemented
✅ Real email sending to your Gmail (when configured)
✅ Fallback mailto system if EmailJS fails
✅ Loading state ("Sending..." button)
✅ Success modal confirmation
✅ Error handling with graceful fallbacks
✅ Form validation
✅ Auto form reset after submission
✅ No forced email client opening

## How It Works Now
1. **User submits form** → Shows loading state
2. **If EmailJS is configured** → Attempts to send email directly
3. **If EmailJS succeeds** → Shows success modal, resets form
4. **If EmailJS fails or not configured** → Uses fallback system:
   - Still shows success modal for good UX
   - Optionally offers to open email client with pre-filled message
   - User can choose whether to send via their email client

## Troubleshooting
- If emails don't arrive, check Gmail spam folder
- Verify service and template IDs match exactly
- Make sure you're using the correct public key
- Check browser console for error messages

## Free Tier Limits
- 200 emails per month
- No credit card required
- Perfect for portfolio/business contact forms
