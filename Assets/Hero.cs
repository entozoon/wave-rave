using System;
using UnityEngine;
// window > package manager > install 'input system'
// edit > project settings > player > other settings > active input handling..
using UnityEngine.InputSystem;
public class Hero : MonoBehaviour
{
  private HeroInputActions _inputActions;
  // public InputAction moveAction;
  // PlayerInputActions inputAction
  public float acceleration;
  private Rigidbody2D rigidBody;
  private void Awake()
  {
    _inputActions = new HeroInputActions(); // my bindings script, generated from the input actions asset
  }
  private void OnEnable()
  { // move up to awake?
    _inputActions.Player.Move.performed += OnMove; // does that fucking append a function?
    Debug.Log("OnEnable");
  }
  private void OnMove(InputAction.CallbackContext context)
  {
    var value = context.ReadValue<float>();
    Debug.Log(value);
  }
  void Start()
  {
    Debug.Log("Hero start!");
    rigidBody = GetComponent<Rigidbody2D>();
    // moveAction = new InputAction;
  }
  // physics (before update)
  void FixedUpdate()
  {
    var keyboard = Keyboard.current;
    if (keyboard.dKey.wasPressedThisFrame)
    {
    //   rigidBody.AddForce(new Vector2(10, 0) * acceleration);
      Debug.Log("d");
    }
    // if (keyboard.aKey.wasPressedThisFrame)
    // {
    //   rigidBody.AddForce(new Vector2(-10, 0) * acceleration);
    //   Debug.Log("a");
    // }
  }
  void Update()
  {
  }

  // Input events https://www.youtube.com/watch?v=Gz0YcjXBJ3U

  // public void moveAction(InputAction.CallbackContext context)
  // {
  //   Debug.Log("MOVE");
  // }


  // private void MoveOnPerformed(InputAction.CallbackContext _callbackContext)
  // {
  //   var value = _callbackContext.ReadValue<Vector2>();
  //   // if (value.magnitude > .1f)
  //   //   MoveAxis = value;
  //   // else MoveAxis = Vector2.zero;
  // }


  // Input events set up like
  // https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/QuickStartGuide.html
}