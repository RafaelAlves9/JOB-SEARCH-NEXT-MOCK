import { query } from 'linkedin-jobs-api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const { keywords, page } = body;

      if (!keywords) {
         return NextResponse.json({ message: 'Keywords are required' }, { status: 400 });
      }

      const queryOptions = {
         keyword: keywords,
         location: 'Brazil',
         dateRange: 'last week',
         limit: 20,
         page: page,
      };

      const jobs = await query(queryOptions);

      return NextResponse.json(jobs);
   } catch (error) {
      console.error('Error fetching jobs from LinkedIn:', error);
      return NextResponse.json({ message: 'Failed to fetch jobs', error }, { status: 500 });
   }
}
