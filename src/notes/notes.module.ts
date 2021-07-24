import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Note, NoteSchema} from "./schemas/note.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:Note.name, schema:NoteSchema}])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
