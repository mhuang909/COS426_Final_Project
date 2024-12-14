import { CollisionBody } from "@components/physics/collisionbody";
import { PhysicsEngine } from "@components/physics/physics";

export class Exit extends CollisionBody {
  constructor(e: PhysicsEngine, x: number, y: number, w: number, h: number) {
    super(e, x, y, w, h, 'exit', true)
  }

}
