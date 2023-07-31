import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Banners} from '../models';
import {BannersRepository} from '../repositories';

export class BannersController {
  constructor(
    @repository(BannersRepository)
    public bannersRepository : BannersRepository,
  ) {}

  @post('/banners')
  @response(200, {
    description: 'Banners model instance',
    content: {'application/json': {schema: getModelSchemaRef(Banners)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banners, {
            title: 'NewBanners',
            exclude: ['id'],
          }),
        },
      },
    })
    banners: Omit<Banners, 'id'>,
  ): Promise<Banners> {
    return this.bannersRepository.create(banners);
  }

  @get('/banners/count')
  @response(200, {
    description: 'Banners model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Banners) where?: Where<Banners>,
  ): Promise<Count> {
    return this.bannersRepository.count(where);
  }

  @get('/banners')
  @response(200, {
    description: 'Array of Banners model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Banners, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Banners) filter?: Filter<Banners>,
  ): Promise<Banners[]> {
    return this.bannersRepository.find(filter);
  }

  @patch('/banners')
  @response(200, {
    description: 'Banners PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banners, {partial: true}),
        },
      },
    })
    banners: Banners,
    @param.where(Banners) where?: Where<Banners>,
  ): Promise<Count> {
    return this.bannersRepository.updateAll(banners, where);
  }

  @get('/banners/{id}')
  @response(200, {
    description: 'Banners model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Banners, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Banners, {exclude: 'where'}) filter?: FilterExcludingWhere<Banners>
  ): Promise<Banners> {
    return this.bannersRepository.findById(id, filter);
  }

  @patch('/banners/{id}')
  @response(204, {
    description: 'Banners PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banners, {partial: true}),
        },
      },
    })
    banners: Banners,
  ): Promise<void> {
    await this.bannersRepository.updateById(id, banners);
  }

  @put('/banners/{id}')
  @response(204, {
    description: 'Banners PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() banners: Banners,
  ): Promise<void> {
    await this.bannersRepository.replaceById(id, banners);
  }

  @del('/banners/{id}')
  @response(204, {
    description: 'Banners DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bannersRepository.deleteById(id);
  }
}
