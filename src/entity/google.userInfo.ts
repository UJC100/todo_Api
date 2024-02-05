import { Injectable } from "@nestjs/common";
import { BaseEntity } from "./Base.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class GoogleEntity extends BaseEntity{
    @Column()
    email: string;

    @Column()
    displayName: string;
}