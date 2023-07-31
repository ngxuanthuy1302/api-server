import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Size, SizeRelations} from '../models';

export class SizeRepository extends DefaultCrudRepository<
  Size,
  typeof Size.prototype.id,
  SizeRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Size, dataSource);
  }
}
