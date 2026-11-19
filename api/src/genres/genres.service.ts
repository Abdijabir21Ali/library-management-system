import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGenreDto) {
    // Check if genre with slug already exists
    const existing = await this.prisma.genre.findUnique({
      where: { slug: dto.slug },
    });
    if (existing) {
      throw new ConflictException('Genre with this slug already exists');
    }

    return this.prisma.genre.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.genre.findMany({
      include: { books: true }, // Include books so we can see the relationship
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  async update(id: number, dto: Partial<CreateGenreDto>) {
    await this.findOne(id); // Throws 404 if not found
    
    return this.prisma.genre.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Throws 404 if not found
    
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
