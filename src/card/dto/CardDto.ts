export class CreateCardDto {
  titleRu: string;
  titleEn: string;
  frontSide?: string;
  backSide?: string;
  transcription?: string;
}
export class CreateCardDtoWithID extends CreateCardDto {
  stackId: number;
}
