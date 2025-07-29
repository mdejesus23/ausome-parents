'use server';

export type State = {
  success: boolean | null;
  message: string;
};

export default async function subscribe(
  prevState: State,
  formData: FormData,
): Promise<State> {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = process.env.BREVO_LIST_ID;

    // Validate environment variables
    if (!BREVO_API_KEY || !LIST_ID) {
      return {
        success: false,
        message: 'Server configuration error. Please try again later.',
      };
    }
    const email = formData.get('email') as string;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: 'Invalid email address.' };
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [parseInt(LIST_ID || '6')],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo error', errorData);
      return {
        success: false,
        message:
          errorData?.message || "There's an error with subscribing your email.",
      };
    }

    return { success: true, message: "You've successfully subscribe!" };
  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    };
  }
}
