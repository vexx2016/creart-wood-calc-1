import React from 'react';
import { InputGroup, InputGroupAddon, Input, Row, Col, Container, FormGroup, Label } from 'reactstrap';

class ModalExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            a: 0,
            b: 0,
            P_m: 0,
            isPaint: false,
            grav_price: 0,
            rez_price: 0,
            matherialName: '',
            S_gr: 0,
            discount: 0,
            L_rez: 0,
            urgently: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: Number(value)
        });

        if (name === 'P_m') {
            this.setState({
                matherialName: event.target.attributes.getNamedItem('data-key').value
            });
        }
    }

    getMatherials = (matherials) => {
        let matherials_list = [];

        for (let key in matherials) {
            matherials_list.push(<FormGroup key={key} check>
                <Label check>
                    <Input key={key} data-key={key} type="radio" value={matherials[key]} name="P_m" onChange={this.handleChange} />{' '}
                    {key}</Label>
            </FormGroup>)
        }
        return matherials_list;
    }

    getGrav_price = (grav_prices, matherials) => {
        for (let price in grav_prices) {
            if ((this.state.matherialName).indexOf(price) !== -1) {
                return grav_prices[price]
            }
        }
        return -1
    }

    getRez_price = (rez_prices, matherials) => {
        for (let price in rez_prices) {
            if ((this.state.matherialName).indexOf(price) !== -1) {
                return rez_prices[price]
            }
        }
        return -1
    }

    getDiscountValue = () => {
        return precisionRound(((this.getMatherialPrice() +
            this.getRezPrice() +
            this.getGravPrice() +
            this.getPaintingPrice()) * this.state.discount) / 100, 2)
    }

    getUrgentPrice = () => {
        return precisionRound(((this.getMatherialPrice() +
            this.getRezPrice() +
            this.getGravPrice() +
            this.getPaintingPrice()) * this.state.urgently) / 100, 2)
    }

    getMatherialPrice = () => precisionRound(this.state.a * this.state.b * this.state.P_m, 2);

    getMatherialSquare = () => precisionRound(this.state.a * this.state.b, 4);

    getRezPrice = () => (this.getRez_price(this.props.data.rez_prices, this.props.data.matherials) === -1) ? 0 : precisionRound(this.getRez_price(this.props.data.rez_prices, this.props.data.matherials) * this.state.L_rez, 2);

    getGravPrice = () => (this.getGrav_price(this.props.data.grav_prices, this.props.data.matherials) === -1) ? 0 : precisionRound(this.getGrav_price(this.props.data.grav_prices, this.props.data.matherials) * this.state.S_gr, 2);

    getPaintingPrice = () => (this.state.isPaint) ? precisionRound(this.state.a * this.state.b * this.props.data.painting, 2) : 0;


    render() {
        let { discount, urgently, matherials } = this.props.data;

        return (
            <Container>
                <Row>
                    <Col sm='6'>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Длинна реза</Label>
                            <InputGroup size="sm">
                                <Input placeholder="0" type="number" step="0.01" min='0' name='L_rez' onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">м/п</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Площадь фигуры, м.кв.</Label>
                            <InputGroup size="sm">
                                <Input placeholder="" type="number" step="0.01" min='0' name='a' onChange={this.handleChange} />
                                <Input placeholder="" type="number" step="0.01" min='0' name='b' onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">м.</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Площадь гравировки</Label>
                            <InputGroup size="sm">
                                <Input placeholder="0" type="number" step="0.01" min='0' name='S_gr' onChange={this.handleChange} />
                                <InputGroupAddon addonType="append">м.кв.</InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='mt-4'>
                            <h4>Дополнительные опции</h4>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Покраска</Label>
                            <Input size="sm" type="select" value={this.state.isPaint} id="exampleSelect" name='isPaint' onChange={this.handleChange}>
                                <option value={0}>Нет</option>
                                <option value={1}>Да</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Скидка</Label>
                            <Input size="sm" type="select" name="discount" onChange={this.handleChange}>
                                {getDiscount(discount)}
                            </Input>
                        </FormGroup>
                        <FormGroup className='mb-2'>
                            <Label className='mb-1'>Срочный заказ</Label>
                            <Input size="sm" type="select" name="urgently" onChange={this.handleChange}>
                                <option value='0'>Нет</option>
                                <option value={urgently}>Да</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm='3'>
                        {this.getMatherials(matherials)}
                    </Col>
                    <Col sm='3'>
                        <h4>Результат</h4>
                        <div>
                            <Label>Площадь материала:&nbsp;</Label><Label>{this.getMatherialSquare()}</Label><Label>м.кв.</Label>
                        </div>
                        <div>
                            <Label>Цена материала:&nbsp;</Label><Label>{this.getMatherialPrice()}</Label><Label>грн.</Label>
                        </div>
                        <div>
                            <Label>Цена резки:&nbsp;</Label><Label>{this.getRezPrice()}</Label><Label>грн.</Label>
                        </div>
                        <div>
                            <Label>Цена гравировки:&nbsp;</Label><Label>{this.getGravPrice()}</Label><Label>грн.</Label>
                        </div>
                        <div>
                            <Label>Скидка ({this.state.discount}%):&nbsp;</Label><Label>{this.getDiscountValue()}</Label><Label>грн.</Label>
                        </div>
                        <div>
                            <Label>Цена покраски:&nbsp;</Label><Label>{this.getPaintingPrice()}</Label><Label>грн.</Label>
                        </div>
                        <div>
                            <Label>Срочность:&nbsp;</Label><Label>{this.getUrgentPrice()}</Label><Label>грн.</Label>
                        </div>
                        <div className=''>
                            <h6>Итого:&nbsp;<Label>
                                {precisionRound(
                                    this.getMatherialPrice() +
                                    this.getRezPrice() +
                                    this.getGravPrice() +
                                    this.getPaintingPrice() -
                                    this.getDiscountValue() +
                                    this.getUrgentPrice(),
                                    2)
                                }
                            </Label><Label>грн.</Label></h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const getDiscount = (discount) => {
    let options = [];

    for (let key in discount) {
        options.push(<option value={discount[key]} key={key} >{key}</option>)
    }
    return options;
}




function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}




export default ModalExample;