import {IsDefined, IsString, MaxLength} from "class-validator";
import {ApiParam, ApiProperty} from "@nestjs/swagger";


export class CreateNoteDto {


    @ApiProperty(
        {
            description: 'The title of the Note',
            maxLength: 50
        }
    )
    @IsString()
    @MaxLength(50,{ message:'title is too long. Maximal length is $constraint1.'})
    title: string;

    @ApiProperty({
        description: 'the content of the Note'
    })
    @IsString()
    description: string;
}
