import { Module } from '@nestjs/common';
import { Generator } from './generator.service';

@Module({
  providers: [Generator],
  exports: [Generator],
})
export class CommonModule {}
