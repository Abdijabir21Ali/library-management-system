import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    const existing = await this.prisma.book.findUnique({
      where: { isbn: dto.isbn },
    });
    if (existing) {
      throw new ConflictException('Book with this ISBN already exists');
    }

    return this.prisma.book.create({
      data: {
        ...dto,
        availableCopies: dto.totalCopies, // By default, available = total
      },
      include: { genre: true },
    });
  }

  async findAll(genreId?: string, search?: string, page: number = 1, limit: number = 10) {
    // 1. Build the WHERE clause based on query parameters
    const where: any = {};
    
    if (genreId) {
      where.genreId = Number(genreId);
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 2. Calculate pagination
    const skip = (page - 1) * limit;

    // 3. Execute query and count total for pagination metadata
    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        include: { genre: true },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id); // Ensure exists
    
    return this.prisma.book.update({
      where: { id },
      data: dto,
      include: { genre: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure exists
    
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
