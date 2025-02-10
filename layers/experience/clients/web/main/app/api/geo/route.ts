import { NextRequest, NextResponse } from 'next/server';
import { countries } from '@/components/ui/country-selector/countries.json';

export async function GET(request: NextRequest) {
  try {
    // Get IP from X-Forwarded-For header or fallback to the remote address
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : request.ip;

    // Call IP geolocation API
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.country_code) {
      const detectedCountry = countries.find(
        country => country.code.toLowerCase() === data.country_code.toLowerCase()
      );

      if (detectedCountry) {
        return NextResponse.json({ country: detectedCountry });
      }
    }

    // Fallback to first country if detection fails
    return NextResponse.json({ country: countries[0] });
  } catch (error) {
    console.error('Error detecting country:', error);
    return NextResponse.json({ country: countries[0] });
  }
} 