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
         dateSincePosted: 'past Week',
         limit: 20,
         page: String(page),
      };

      const jobs = await query(queryOptions);

      // A API externa retorna um array. Se o tamanho do array for o limite solicitado,
      // assumimos que pode haver mais páginas.
      const hasMore = jobs.length === queryOptions.limit;
      const totalResults = jobs.length; // A API não retorna o total, então usamos o total da página

      return NextResponse.json({
         jobs,
         hasMore,
         total: totalResults,
      });
   } catch (error) {
      console.error('Error fetching jobs from LinkedIn:', error);
      return NextResponse.json({ message: 'Failed to fetch jobs', error }, { status: 500 });
   }
}
