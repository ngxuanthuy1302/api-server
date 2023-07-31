import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Products, ProductsRelations, Collection, Categories} from '../models';
import {CollectionRepository} from './collection.repository';
import {CategoriesRepository} from './categories.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {

  public readonly collection: BelongsToAccessor<Collection, typeof Products.prototype.id>;

  public readonly categories: BelongsToAccessor<Categories, typeof Products.prototype.id>;

  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CollectionRepository') protected collectionRepositoryGetter: Getter<CollectionRepository>, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>,) {
    super(Products, dataSource);
    this.categories = this.createBelongsToAccessorFor('categories', categoriesRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
    this.collection = this.createBelongsToAccessorFor('collection', collectionRepositoryGetter,);
    this.registerInclusionResolver('collection', this.collection.inclusionResolver);

    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.updatedAt = new Date();
    });
  }
}
