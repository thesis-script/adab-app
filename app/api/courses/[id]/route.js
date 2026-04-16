import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const courseRes = await query(`
      SELECT co.*, c.name as category_name, c.slug as category_slug, c.color as category_color
      FROM courses co
      LEFT JOIN categories c ON co.category_id = c.id
      WHERE co.id = $1 AND co.is_published = true
    `, [numericId]);

    if (courseRes.rows.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const course = courseRes.rows[0];

    const sectionsRes = await query(
      'SELECT * FROM sections WHERE course_id = $1 ORDER BY order_index ASC',
      [course.id]
    );
    course.sections = sectionsRes.rows;

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, slug, category_id, cover_color, level, is_published } = body;

    const result = await query(`
      UPDATE courses 
      SET title=$1, description=$2, slug=$3, category_id=$4, cover_color=$5, level=$6, is_published=$7, updated_at=NOW()
      WHERE id=$8
      RETURNING *
    `, [title, description, slug, category_id, cover_color, level, is_published, numericId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ course: result.rows[0] });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await query('DELETE FROM courses WHERE id=$1', [numericId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}