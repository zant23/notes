import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export type NoteDocument = Note & Document;

@Schema()
export class Note {
    @Prop()
    @ApiProperty()
    id:string;
    @Prop()
    @ApiProperty()
    title: string;
    @Prop()
    @ApiProperty()
    description: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
NoteSchema.set('toJSON', {
    virtuals: true,
    transform:(doc, ret, _) => {
        delete ret.__v;
        ret.id = ret._id.toString();
        delete ret._id;
    },
});