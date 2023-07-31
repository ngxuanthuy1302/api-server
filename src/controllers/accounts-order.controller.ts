import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Accounts,
  Order,
} from '../models';
import {AccountsRepository} from '../repositories';

export class AccountsOrderController {
  constructor(
    @repository(AccountsRepository) protected accountsRepository: AccountsRepository,
  ) { }

  @get('/accounts/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Accounts has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.accountsRepository.orders(id).find(filter);
  }

  @post('/accounts/{id}/orders', {
    responses: {
      '200': {
        description: 'Accounts model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Accounts.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInAccounts',
            exclude: ['id'],
            optional: ['accountsId']
          }),
        },
      },
    }) order: Omit<Order, 'id'>,
  ): Promise<Order> {
    return this.accountsRepository.orders(id).create(order);
  }

  @patch('/accounts/{id}/orders', {
    responses: {
      '200': {
        description: 'Accounts.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.accountsRepository.orders(id).patch(order, where);
  }

  @del('/accounts/{id}/orders', {
    responses: {
      '200': {
        description: 'Accounts.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.accountsRepository.orders(id).delete(where);
  }
}
