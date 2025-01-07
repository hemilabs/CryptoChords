import { describe, it, expect } from 'vitest';
import { Entity } from './Entity';
import { ValueObject } from './ValueObject';
import { Uuid } from '../valueObjects/Uuid';

interface TestProps {
  value: string;
}

class TestEntity extends Entity<TestProps> {
  static create(props: TestProps, id: Uuid): TestEntity {
    return new TestEntity(props, id);
  }

  get value(): string {
    return this.props.value;
  }
}

const testId = Uuid.create();

describe('src/domain/Entity', () => {
  it('should be defined', () => {
    expect(Entity).toBeDefined();
  });

  it('should be instance of ValueObject', () => {
    const entity = TestEntity.create({ value: 'test' }, testId);

    expect(entity).toBeInstanceOf(ValueObject);
  });

  it('should generate a new id if none is passed to constructor', () => {
    const entity = TestEntity.create({ value: 'test' }, testId);

    expect(entity.uuid).toBeDefined();
  });

  it('should set the id if it was passed to constructor', () => {
    const expectedId = testId;
    const entity = TestEntity.create({ value: 'test' }, expectedId);

    expect(entity.uuid).toBe(expectedId);
  });
});
