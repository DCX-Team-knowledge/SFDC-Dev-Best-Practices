//Error handling in (LWC)
//Apex Controller (OrderController.cls)
public with sharing class OrderController {
    @AuraEnabled(cacheable=true)
    public static Order getOrderDetails(Id orderId) {
        try {
            return [SELECT Id, Status, TotalAmount, EffectiveDate FROM Order WHERE Id = :orderId LIMIT 1];
        } catch (QueryException e) {
            throw new CustomException('Order not found or inaccessible.');
        }
    }
    // Custom exception class
    public class CustomException extends Exception {}
}
//Lightning Web Component (LWC)
//HTML Template (orderDetails.html)
<template>
    <lightning-card title="Order Details" icon-name="standard:orders">
        <template if:true={order}>
            <div class="slds-p-horizontal_small">
                <p>Status: {order.Status}</p>
                <p>Total Amount: {order.TotalAmount}</p>
            </div>
        </template>

        <template if:true={error}>
            <c-error-panel errors={error}></c-error-panel>
        </template>
    </lightning-card>
</template>
//JavaScript (orderDetails.js)
import { LightningElement, api, wire, track } from 'lwc';
import getOrderDetails from '@salesforce/apex/OrderController.getOrderDetails';
import { reduceErrors } from 'c/utils';

export default class OrderDetails extends LightningElement {
    @api recordId; // The Order Id passed from the parent component or URL.
    @track order; // To store order details.
    @track error; // To store any errors that occur.

    // Fetch the Order details using the wire service
    @wire(getOrderDetails, { orderId: '$recordId' })
    wiredOrder({ error, data }) {
        if (data) {
            try {
                this.order = data; // Store the order data.
                this.error = undefined; // Reset the error.
            } catch (e) {
                this.error = 'Error processing the order data.';
            }
        } else if (error) {
            this.error = reduceErrors(error); // Use utility to simplify error message.
            this.order = undefined; // Reset the order data.
        }
    }

    // This lifecycle hook is triggered if an error occurs during the rendering process
    errorCallback(error, stack) {
        console.error('Rendering error:', error, stack);
        this.error = 'Error occurred during rendering. Please try again later.';
    }
}
// Error Panel Component.This reusable component will display errors in a consistent format across your LWC applications.
// errorPanel.html
<template>
    <div class="slds-box slds-theme_error">
        <p class="slds-text-heading_small">An error has occurred:</p>
        <ul>
            <template for:each={errors} for:item="error">
                <li key={error}>{error}</li>
            </template>
        </ul>
    </div>
</template>

// errorPanel.js
import { LightningElement, api } from 'lwc';

export default class ErrorPanel extends LightningElement {
    @api errors; // Accepts errors as an array

    get hasErrors() {
        return this.errors && this.errors.length > 0;
    }
}

// Utility Function (utils.js)
// This utility function is used to handle and simplify error messages from different sources (e.g., Apex, LDS).
export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return errors
        .filter(error => !!error)
        .map(error => {
            if (Array.isArray(error.body)) {
                return error.body.map(e => e.message);
            } else if (error.body && typeof error.body.message === 'string') {
                return error.body.message;
            } else if (typeof error.message === 'string') {
                return error.message;
            }
            return 'Unknown error';
        })
        .reduce((prev, curr) => prev.concat(curr), []);
}





