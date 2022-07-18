import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateItemDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly desc: string;

  @IsInt()
  readonly qty: number;
}
