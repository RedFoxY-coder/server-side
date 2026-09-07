export class CreateCardDto {
  titleRu: string;
  titleEn: string;
  frontSide?: string;
  backSide?: string;
  transcription?: string;
  level: string;
}
export class CreateCardDtoWithID extends CreateCardDto {
  stackId: number;
}

export class UpdateCardDto {
  stackId: number;
  level: number
}

export class ChangeLevelDto {
  level: string
}