import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cart,
  Accounts,
} from '../models';
import {CartRepository} from '../repositories';

export class CartAccountsController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/accounts', {
    responses: {
      '200': {
        description: 'Accounts belonging to Cart',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Accounts),
          },
        },
      },
    },
  })
  async getAccounts(
    @param.path.string('id') id: typeof Cart.prototype.id,
  ): Promise<Accounts> {
    return this.cartRepository.accounts(id);
  }
}
