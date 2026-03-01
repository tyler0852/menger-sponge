import { Camera } from "../lib/webglutils/Camera.js";
import { CanvasAnimation } from "../lib/webglutils/CanvasAnimation.js";
import { MengerSponge } from "./MengerSponge.js";
import { Mat4, Vec3 } from "../lib/TSM.js";

/**
 * Might be useful for designing any animation GUI
 */
interface IGUI {
  viewMatrix(): Mat4;
  projMatrix(): Mat4;
  dragStart(me: MouseEvent): void;
  drag(me: MouseEvent): void;
  dragEnd(me: MouseEvent): void;
  onKeydown(ke: KeyboardEvent): void;
}

/**
 * Handles Mouse and Button events along with
 * the the camera.
 */
export class GUI implements IGUI {
  private static readonly rotationSpeed: number = 0.05;
  private static readonly zoomSpeed: number = 0.1;
  private static readonly rollSpeed: number = 0.1;
  private static readonly panSpeed: number = 0.1;

  private camera: Camera;
  private dragging: boolean;
  private fps: boolean;
  private prevX: number;
  private prevY: number;

  private height: number;
  private width: number;

  private sponge: MengerSponge;
  private animation: CanvasAnimation;

  /**
   *
   * @param canvas required to get the width and height of the canvas
   * @param animation required as a back pointer for some of the controls
   * @param sponge required for some of the controls
   */
  constructor(
    canvas: HTMLCanvasElement,
    animation: CanvasAnimation,
    sponge: MengerSponge
  ) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.prevX = 0;
    this.prevY = 0;

    this.sponge = sponge;
    this.animation = animation;

	this.reset();
    console.log("RESET CALLED");

    this.registerEventListeners(canvas);
  }

  /**
   * Resets the state of the GUI
   */
  public reset(): void {
    this.fps = false;
    this.dragging = false;
    /* Create camera setup */
    this.camera = new Camera(
      new Vec3([0, 0, -6]),// eye = pos
      new Vec3([0, 0, 0]), // center = target
      new Vec3([0, 1, 0]), // up
      45,
      this.width / this.height,
      0.1,
      1000.0
      // center = eye + d*look
      // look = normalize(center - eye) // might be negative this
      // d = length(center - eye)
      // right = look x up
    );
  }

  /**
   * Sets the GUI's camera to the given camera
   * @param cam a new camera
   */
  public setCamera(
    pos: Vec3, // eye = pos
    target: Vec3, // center = target?
    upDir: Vec3,  // up
    fov: number,
    aspect: number,
    zNear: number,
    zFar: number
    // center = eye + d*look
    // lookDir = normalize(eye - center) // might be negative this
    // d = length(center - eye)
    // right = look x up
  ) {
    this.camera = new Camera(pos, target, upDir, fov, aspect, zNear, zFar);
  }

  /**
   * Returns the view matrix of the camera
   */
  public viewMatrix(): Mat4 {
    return this.camera.viewMatrix();
  }

  /**
   * Returns the projection matrix of the camera
   */
  public projMatrix(): Mat4 {
    return this.camera.projMatrix();
  }

  /**
   * Callback function for the start of a drag event.
   * @param mouse
   */
  public dragStart(mouse: MouseEvent): void {
    this.dragging = true;
    this.prevX = mouse.screenX;
    this.prevY = mouse.screenY;
  }

  /**
   * The callback function for a drag event.
   * This event happens after dragStart and
   * before dragEnd.
   * @param mouse
   */
  public drag(mouse: MouseEvent): void {
	  
	  // TODO: Your code here for left and right mouse drag
	  
  }

  /**
   * Callback function for the end of a drag event
   * @param mouse
   */
  public dragEnd(mouse: MouseEvent): void {
    this.dragging = false;
    this.prevX = 0;
    this.prevY = 0;
  }

  /**
   * Callback function for a key press event
   * @param key
   */
  public onKeydown(key: KeyboardEvent): void {
    /*
       Note: key.code uses key positions, i.e a QWERTY user uses y where
             as a Dvorak user must press F for the same action.
       Note: arrow keys are only registered on a KeyDown event not a
       KeyPress event
       We can use KeyDown due to auto repeating.
     */

	// TOOD: Your code for key handling

    switch (key.code) {
      case "KeyW": {
        console.log("Key : W was pressed.");

        const lookDir = this.camera.target().copy(); // lookDir = normalize(center-eye)
        lookDir.subtract(this.camera.pos());
        lookDir.normalize();
        lookDir.scale(GUI.zoomSpeed);
        
        const eye = this.camera.pos().copy();
        eye.add(lookDir);
        this.camera.setPos(eye); // scale eye by zoomSpeed*lookDir

        const center = this.camera.target().copy();
        center.add(lookDir);
        this.camera.setTarget(center); // scale center by zoomSPeed*lookDir

        break;
      }
      case "KeyA": {
        console.log("Key : A was pressed.");

        const lookDir = this.camera.target().copy(); // lookDir = normalize(center-eye)
        lookDir.subtract(this.camera.pos());
        lookDir.normalize();

        const right = Vec3.cross(this.camera.up(), lookDir); //right = look x up
        right.normalize(); 
        right.scale(GUI.panSpeed);

        const eye = this.camera.pos().copy();
        eye.subtract(right);
        this.camera.setPos(eye); // translate eye by -panSpeed*tanDir

        break;
      }
      case "KeyS": {
        console.log("Key : S was pressed.");

        const lookDir = this.camera.target().copy(); // lookDir = normalize(center-eye)
        lookDir.subtract(this.camera.pos());
        lookDir.normalize();
        lookDir.scale(GUI.zoomSpeed);
        
        const eye = this.camera.pos().copy();
        eye.subtract(lookDir);
        this.camera.setPos(eye); // scale eye by -zoomSpeed*lookDir

        const center = this.camera.target().copy();
        center.subtract(lookDir);
        this.camera.setTarget(center); // scale center by -zoomSPeed*lookDir

        break;
      }
      case "KeyD": {
        console.log("Key : D was pressed.");

        const lookDir = this.camera.target().copy(); // lookDir = normalize(center-eye)
        lookDir.subtract(this.camera.pos());
        lookDir.normalize();

        const right = Vec3.cross(this.camera.up(), lookDir); //right = look x up
        right.normalize(); 
        right.scale(GUI.panSpeed);

        const eye = this.camera.pos().copy();
        eye.add(right);
        this.camera.setPos(eye); // translate eye by panSpeed*tanDir

        break;
      }
      case "KeyR": {

        break;
      }
      case "ArrowLeft": {
        console.log("Key : Left Arrow was pressed.");
        this.camera.roll(GUI.rollSpeed, false); // left = counterclockwise (false)

        break;
      }
      case "ArrowRight": {
        console.log("Key : Right Arrow was pressed.");
        this.camera.roll(GUI.rollSpeed, true); // right = clockwise (true)

        break;
      }
      case "ArrowUp": {
        console.log("Key : Up Arrow was pressed.");

        const up = this.camera.up().copy();
        up.scale(GUI.panSpeed)

        const eye = this.camera.pos().copy();
        eye.add(up);

        this.camera.setPos(eye); // translate eye by panSpeed*upDir

        break;
      }
      case "ArrowDown": {
        console.log("Key : Down Arrow was pressed.");

        const up = this.camera.up().copy();
        up.scale(GUI.panSpeed)

        const eye = this.camera.pos().copy();
        eye.subtract(up);

        this.camera.setPos(eye); // translate eye by -panSpeed*upDir

        break;
      }
      case "Digit1": {

        break;
      }
      case "Digit2": {

        break;
      }
      case "Digit3": {

        break;
      }
      case "Digit4": {

        break;
      }
      default: {
        console.log("Key : '", key.code, "' was pressed.");
        break;
      }
    }
  }

  /**
   * Registers all event listeners for the GUI
   * @param canvas The canvas being used
   */
  private registerEventListeners(canvas: HTMLCanvasElement): void {
    /* Event listener for key controls */
    window.addEventListener("keydown", (key: KeyboardEvent) =>
      this.onKeydown(key)
    );

    /* Event listener for mouse controls */
    canvas.addEventListener("mousedown", (mouse: MouseEvent) =>
      this.dragStart(mouse)
    );

    canvas.addEventListener("mousemove", (mouse: MouseEvent) =>
      this.drag(mouse)
    );

    canvas.addEventListener("mouseup", (mouse: MouseEvent) =>
      this.dragEnd(mouse)
    );

    /* Event listener to stop the right click menu */
    canvas.addEventListener("contextmenu", (event: any) =>
      event.preventDefault()
    );
  }
}
