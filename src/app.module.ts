import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/databaseConfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpeciesEntity } from './pets/entities/species.entity';
import { PetEntity } from './pets/entities/pet.entity';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: false,
        dropSchema: false,
        migrationsRun: true,
        ssl:true,
        migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
        migrationsTableName: 'migrations_history',
        entities: [SpeciesEntity, PetEntity],
      }),
      inject: [ConfigService],
    }),
    PetsModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
