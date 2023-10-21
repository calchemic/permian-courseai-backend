import { Injectable } from '@nestjs/common';
import { CreateVoiceDto } from './dto/create-voice.dto';
import { UpdateVoiceDto } from './dto/update-voice.dto';
import axios from 'axios';

@Injectable()
export class VoiceService {
  private get voiceClienttts() {
    return axios.create({
      baseURL: 'https://api.play.ht',
      headers: {
        'content-type': 'application/json', // Set the content type to application/json.
        AUTHORIZATION: process.env.PLAY_HT_SECRET_KEY,
        'X-USER-ID': process.env.PLAY_HT_USER_ID,
        Accept: 'application/json',
      },
    });
  }

  private get voiceClient() {
    return axios.create({
      baseURL: 'https://api.elevenlabs.io',
      headers: {
        accept: 'audio/mpeg', // Set the expected response type to audio/mpeg.
        'content-type': 'application/json', // Set the content type to application/json.
        'xi-api-key': `${process.env.ELEVEN_LABS_API_KEY}`, // Set the API key in the headers.
      },
      responseType: 'arraybuffer',
    });
  }

  private get gptClient() {
    return axios.create({
      baseURL: 'https://api.openai.com',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
      },
    });
  }

  async create(createVoiceDto: CreateVoiceDto) {
    let message =
      'Use your knowledge to answer the student question.Your answer should be formatted as json with a heading, followed by an string array of points. Structure your answer in points and restrict to a maximum of five points.  \n\n';

    // let message =
    //   'A student has asked you the following question. Please answer it to the best of your knowledge.  \n\n';

    message += `Question: ${createVoiceDto.content}`;
    const payloadObj = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    };
    const data = await this.gptClient
      .post('/v1/chat/completions', JSON.stringify(payloadObj))
      .then((res) => {
        console.log(res.data.choices[0].message.content);
        return res.data.choices[0].message.content;
      })
      .catch((error) => {
        return null;
      });

    // return data;

    // console.log(data);

    const formattedData = JSON.parse(data);
    console.log(formattedData);
    const aiPoints = formattedData.points;

    return aiPoints;

    // const dataAsString = aiPoints.join(' ');

    // const voicePayload = {
    //   text: dataAsString,
    // };

    // const speechData = await this.voiceClient
    //   .post('/v1/text-to-speech/ErXwobaYiN019PkySvjV', voicePayload)
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     return null;
    //   });

    // const speechDetails = speechData.data;
    // console.log(speechDetails);

    // return { dataAsString, aiPoints };
  }

  async createVoice(createVoiceDto: CreateVoiceDto) {
    const payloadObj = {
      text: createVoiceDto.content,
      voice: 'larry',
      output_format: 'mulaw',
      voice_engine: 'PlayHT2.0-turbo',
      quality: 'draft',
    };

    const data = await this.voiceClienttts
      .post('/api/v2/tts/stream', JSON.stringify(payloadObj))
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log('ERROR');
        return null;
      });
  }

  findAll() {
    return `This action returns all voice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voice`;
  }

  update(id: number, updateVoiceDto: UpdateVoiceDto) {
    return `This action updates a #${id} voice`;
  }

  remove(id: number) {
    return `This action removes a #${id} voice`;
  }
}
