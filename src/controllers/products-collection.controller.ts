import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Products,
  Collection,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsCollectionController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/collection', {
    responses: {
      '200': {
        description: 'Collection belonging to Products',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Collection),
          },
        },
      },
    },
  })
  async getCollection(
    @param.path.string('id') id: typeof Products.prototype.id,
  ): Promise<Collection> {
    return this.productsRepository.collection(id);
  }
}
