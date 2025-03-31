import { NextResponse } from 'next/server';
import axios from 'axios';

// Handle POST requests
export async function POST(req: Request) {
  try {
    const { number, use_quantum, shots, noise_model, backend } = await req.json();
    const parsedNumber = parseInt(number, 10);

    if (!Number.isInteger(parsedNumber) || parsedNumber < 2) {
      return NextResponse.json({ error: 'Please provide a valid integer greater than 1' }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

    const response = await axios.post(`${backendUrl}/superpos/factor`, {
      number: parsedNumber,
      use_quantum: use_quantum || false,
      shots: shots || 100,
      noise_model: noise_model || 'ideal',
      backend: backend || 'simulator',
    });

    return NextResponse.json(response.data, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error factoring number:', error.message);

    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.error || 'Failed to connect to factorization service';

    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
