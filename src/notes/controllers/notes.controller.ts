import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import {Note} from "../schemas/note.schema";


@ApiTags('notes')
@ApiInternalServerErrorResponse({description:'Something went wrong on our end.', schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"string"}}}})
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiCreatedResponse({description:'the created note.', type:Note})
  @ApiBadRequestResponse({description:'request is not valid.', schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"array", items:{type:"string"}},error:{type:"string"}}}})
  @Post()
    create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOkResponse({description: 'requested Note.', type: [Note]})
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'requested Note.', type: Note})
  @ApiNotFoundResponse({description: 'note was not found.', schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"string"}}}})
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'note was successfully updated.', type: Note})
  @ApiBadRequestResponse({description:'request is not valid.', schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"array", items:{type:"string"}},error:{type:"string"}}}})
  @ApiNotFoundResponse({description: 'note was not found.',  schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"string"}}}})
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'note is successfully deleted.'})
  @ApiBadRequestResponse({description:'request is not valid.', schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"array", items:{type:"string"}},error:{type:"string"}}}})
  @ApiNotFoundResponse({description: 'note was not found.',  schema:{type:'object', properties: {statusCode:{type:"integer"},message:{type:"string"}}}})
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
