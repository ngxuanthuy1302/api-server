import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Accounts, Cart, CartRelations} from '../models';
import {AccountsRepository} from './accounts.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id,
  CartRelations
> {
  public readonly accounts: BelongsToAccessor<
    Accounts,
    typeof Cart.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('AccountsRepository')
    protected accountsRepositoryGetter: Getter<AccountsRepository>,
  ) {
    super(Cart, dataSource);
    this.accounts = this.createBelongsToAccessorFor(
      'accounts',
      accountsRepositoryGetter,
    );
    this.registerInclusionResolver('accounts', this.accounts.inclusionResolver);
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date();
    });
  }
}
