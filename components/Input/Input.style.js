import styled from 'styled-components'



export const InputWrapper = styled.div`

  margin-top: 30px;
  text-align: left;

  label {
    font-size: 16px;
    color: #71B7FF;
    font-weight: 200;
  }

  .error-message {
    p {
      color: #627597;
      font-size: 14px;
      margin: 4px 0;
    }
  }

  .inner-our-input {
    display: flex;
    flex-direction: column;

    .inner-level-2 {
      margin-top: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      

      span {
        font-size: 15px;
        font-weight: 100;
        margin-right: 5px;
      }

      .write {
        color: rgb(234, 74, 170);
      }
      .good {
        color: green;
      }
      .bad {
        color: red;
        font-size: 17px;
      }

      input {
        background: transparent;
        border: transparent;
        color: white;
        outline: transparent;
        font-size: 16px;
        font-weight: 100;
        padding: 5px;
      }

      select {
        width: 200px;
        font-size: 16px;
        background-color: transparent;
        color: white;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #627597;

        option {
          background-color: rgb(4, 13, 33);
          padding: 20px;
        }
      }

      .checkbox-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .checkbox-item {
          margin: 5px 25px;
          width: 120px;
          display: flex;

          input {
            width: 20px;
            height: 20px;
          }
          label {
            margin-left: 10px;
            color: white;
          }
        }
      }
    }
    button {
      background-color: transparent;
      outline: green;
      border: 1px solid green;
      padding: 5px 7px;
      font-size: 16px;
      color: green;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
      max-height: 40px;
      align-self: center;
    }

    button:disabled {
      color: #627597;
      border: 1px solid #627597;
    }
  }


@media screen and (min-width: 544px) {
 
    .inner-our-input {
      flex-direction: row;
      justify-content: space-between;
    }
  }

`