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
  Categories,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsCategoriesController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Categories belonging to Products',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Categories),
          },
        },
      },
    },
  })
  async getCategories(
    @param.path.string('id') id: typeof Products.prototype.id,
  ): Promise<Categories> {
    return this.productsRepository.categories(id);
  }
}
