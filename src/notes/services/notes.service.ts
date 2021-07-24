import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Note, NoteDocument} from "../schemas/note.schema";
import {Model, Types} from "mongoose";



@Injectable()

export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto) {
    return new this.noteModel(createNoteDto).save();
  }

  findAll() {
    return this.noteModel.find();
  }

  findOne(id: string) {
    this.verifyIdOrFail(id);
    return this.noteModel.findById(id)
        .orFail(new HttpException('note not found.', HttpStatus.NOT_FOUND));
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    this.verifyIdOrFail(id);
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto, {new:true, useFindAndModify: false, })
        .orFail(new HttpException('note not found.', HttpStatus.NOT_FOUND));
  }

  remove(id: string) {
    this.verifyIdOrFail(id);
    return this.noteModel.findByIdAndDelete(id)
        .orFail(new HttpException('note not found.', HttpStatus.NOT_FOUND));
  }

  private verifyIdOrFail(id:string){
    if(!Types.ObjectId.isValid(id)){
      throw new HttpException('note not found.', HttpStatus.NOT_FOUND);
    }
  }
}
