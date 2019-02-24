import * as THREE from 'three';

class Walker {

  static createGeometry(shape, size) {
    let geometry;
    switch (shape) {
      case 'TRIANGLE 1':
        size = size * 3;
        const h1 = Math.sqrt(Math.pow(size, 2) - Math.pow(size / 2, 2));
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(size / -2, h1 / -2, 0));
        geometry.vertices.push(new THREE.Vector3(size / 2, h1 / -2, 0));
        geometry.vertices.push(new THREE.Vector3(0, h1 / 2, 0));
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        break;
      case 'TRIANGLE 2':
        size = size * 3;
        const h2 = Math.sqrt(Math.pow(size, 2) - Math.pow(size / 2, 2));
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(size / -2, h2 / -2, 0));
        geometry.vertices.push(new THREE.Vector3(size / 2, h2 / 2, 0));
        geometry.vertices.push(new THREE.Vector3(0, h2 / 2, 0));
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        break;
      case 'CIRCLE':
        geometry = new THREE.CircleGeometry(size, 14);
        break;
      case 'SQUARE':
        size = size * 2.5;
        geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(size / -2, size / -2, 0));
        geometry.vertices.push(new THREE.Vector3(size / -2, size / 2, 0));
        geometry.vertices.push(new THREE.Vector3(size / 2, size / 2, 0));
        geometry.vertices.push(new THREE.Vector3(size / 2, size / -2, 0));
        geometry.faces.push(new THREE.Face3(0, 2, 1));
        geometry.faces.push(new THREE.Face3(0, 3, 2));
        break;
    }
    return geometry;
  }

  constructor(x, y, size, minX, maxX, minY, maxY) {
    this.stuck = false;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.size = size;
    const geometry = new THREE.CircleGeometry(size, 8);
    this.material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, opacity: 0.1, transparent: true});
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
  }

  setStuck(color, size, shape) {
    this.stuck = true;
    this.mesh.material.color = new THREE.Color(color);
    this.mesh.material.opacity = 1;
    this.mesh.geometry = Walker.createGeometry(shape, size);
    const scale = size / this.size;
    this.mesh.geometry.scale(scale, scale, scale);
    this.mesh.rotation.z = Math.random() * 2 * Math.PI;
    this.size = size;
  }

  animate(velX, velY) {
    const newX = this.mesh.position.x + velX;
    const newY = this.mesh.position.y + velY;
    if (newX >= this.minX && newX <= this.maxX) {
      this.mesh.position.x = newX;
    }
    if (newY >= this.minY && newY <= this.maxY) {
      this.mesh.position.y = newY;
    }
  }
}

export default Walker;